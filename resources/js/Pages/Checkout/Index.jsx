import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Accordion from '@/Components/Accordion';
import CartProductItem from '@/Components/CartProductItem';
import { toIntAmount } from '@/utils/money';

export default function CheckoutIndex({ auth, cartProducts, subtotal, total, user }) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!auth.user);
    const [localCartProducts, setLocalCartProducts] = useState(cartProducts);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('contra_entrega');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [showUnavailableMessage, setShowUnavailableMessage] = useState(false);
    const [shippingCost, setShippingCost] = useState(20000); // Inicializar con el costo de contra entrega
    // Modals: PSE, Nequi, Nequi Auth
    const [showPseModal, setShowPseModal] = useState(false);
    const [showNequiModal, setShowNequiModal] = useState(false);
    const [showNequiAuthModal, setShowNequiAuthModal] = useState(false);
    // Forms for modals
    const [pseForm, setPseForm] = useState({
        documentType: 'cc',
        documentNumber: '',
        personType: 'natural',
        bank: 'bancolombia',
        holderName: '',
    });
    const [nequiForm, setNequiForm] = useState({
        documentType: 'cc',
        personType: 'natural',
        bank: 'nequi',
    });
    const [nequiAuthForm, setNequiAuthForm] = useState({
        phone: '',
        password: '',
        notRobot: false,
    });

    // Cargar datos del carrito desde localStorage si no hay datos del servidor
    useEffect(() => {
        if (!cartProducts || cartProducts.length === 0) {
            const savedCart = localStorage.getItem('cart_data');
            if (savedCart) {
                try {
                    const cartData = JSON.parse(savedCart);
                    // Procesar los datos del carrito para incluir subtotales
                    const processedCart = cartData.map(item => {
                        console.log('Procesando item:', item);
                        console.log('Imágenes del item:', item.imagenes);
                        
                        return {
                            ...item,
                            cantidad: item.quantity,
                            subtotal: item.precio * item.quantity,
                            imagen: item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : null
                        };
                    });
                    setLocalCartProducts(processedCart);
                } catch (error) {
                    console.error('Error al cargar carrito desde localStorage:', error);
                }
            }
        }
    }, [cartProducts]);

    const { data, setData, post, processing, errors } = useForm({
        cart_products: localCartProducts || [],
        user_data: {
            email: user?.email || '',
            name: user?.name || '',
            last_name: user?.last_name || '',
            phone: user?.phone || '',
        },
        delivery_data: {
            department: 'Sucre',
            municipality: 'Corozal',
            delivery_method: 'contra_entrega',
            address: '',
            city: 'Corozal, Sucre',
            additional_info: '',
            recipient: '',
        },
        payment_data: {
            payment_method: '',
            bank: '',
        },
        terms_accepted: false,
    });

    // Actualizar el formulario cuando cambien los productos locales
    useEffect(() => {
        setData('cart_products', localCartProducts || []);
    }, [localCartProducts]);

    const handleQuantityChange = (productId, delta) => {
        const updatedProducts = data.cart_products.map(product => {
            if (product.id === productId) {
                const newQuantity = Math.max(1, product.cantidad + delta);
                return {
                    ...product,
                    cantidad: newQuantity,
                    subtotal: product.precio * newQuantity
                };
            }
            return product;
        });
        
        setData('cart_products', updatedProducts);
    };

    const removeProduct = (productId) => {
        const updatedProducts = data.cart_products.filter(product => product.id !== productId);
        setData('cart_products', updatedProducts);
    };

    const handleUserDataChange = (field, value) => {
        setData('user_data', {
            ...data.user_data,
            [field]: value
        });
    };

    const handleDeliveryDataChange = (field, value) => {
        setData('delivery_data', {
            ...data.delivery_data,
            [field]: value
        });
        
        // Actualizar el costo de envío cuando se cambie el método de entrega
        if (field === 'delivery_method') {
            if (value === 'contra_entrega') {
                setShippingCost(20000);
            } else if (value === 'envio_domicilio') {
                setShippingCost(5000);
            } else {
                setShippingCost(0);
            }
        }
    };

    const handlePaymentDataChange = (field, value) => {
        setData('payment_data', {
            ...data.payment_data,
            [field]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            alert('Debes aceptar los términos y condiciones para continuar.');
            return;
        }
        
        setData('terms_accepted', true);
        post(route('checkout.store'));
    };

    const handleProceedToPayment = () => {
        if (!termsAccepted) {
            alert('Debes aceptar los términos y condiciones para continuar.');
            return;
        }
        setShowUserForm(true);
    };

    const handleGoToDelivery = () => {
        if (!validateUserForm()) {
            alert('Por favor completa todos los campos obligatorios de información personal.');
            return;
        }
        setShowDeliveryForm(true);
    };

    const handleGoToPayment = () => {
        if (!validateDeliveryForm()) {
            alert('Por favor completa todos los campos obligatorios de información de entrega.');
            return;
        }
        setShowPaymentForm(true);
    };

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
        handlePaymentDataChange('payment_method', method);
        setSelectedBank(''); // Reset bank selection
        
        if (method === 'efecty' || method === 'tarjeta') {
            setShowUnavailableMessage(true);
        } else {
            setShowUnavailableMessage(false);
        }
        if (method === 'pse') {
            // abrir modal PSE directamente al escoger PSE
            setShowPseModal(true);
        }
    };

    const handleContinuePayment = () => {
        if (selectedPaymentMethod === 'pse' && selectedBank === 'nequi') {
            // Redirigir a la página de Nequi
            window.location.href = 'https://www.nequi.com.co/';
        } else if (selectedPaymentMethod === 'efecty') {
            alert('El método de pago Efecty aún no está disponible.');
        } else if (selectedPaymentMethod === 'tarjeta') {
            alert('El método de pago con tarjeta de crédito aún no está disponible.');
        } else {
            alert('Por favor selecciona un método de pago.');
        }
    };

    const validateUserForm = () => {
        const { email, name, last_name, phone } = data.user_data;
        return email && name && last_name && phone;
    };

    const validateDeliveryForm = () => {
        const { department, municipality, address, city, recipient } = data.delivery_data;
        return department && municipality && address && city && recipient;
    };

    const recalculateTotals = () => {
        const newSubtotal = data.cart_products.reduce((sum, product) => sum + product.subtotal, 0);
        const newTotal = newSubtotal + shippingCost;
        return { subtotal: newSubtotal, total: newTotal };
    };

    const { subtotal: currentSubtotal, total: currentTotal } = recalculateTotals();

    return (
        <GuestLayout auth={auth} fullWidth={true}>
            <Head title="Checkout" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
                        <p className="text-gray-600 text-sm">Completa tu compra de manera segura</p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-6xl mx-auto">
                        {/* Columna principal - Detalle de productos */}
                        <div className="xl:col-span-7">
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-100">
                                <h2 className="text-lg font-bold mb-3 text-center">Detalle de productos</h2>
                                
                                {data.cart_products.length === 0 ? (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500 mb-2">No hay productos en el carrito</p>
                                        <Link href="/" className="text-blue-600 hover:text-blue-800">
                                            Continuar comprando
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {data.cart_products.map((product) => (
                                            <CartProductItem
                                                key={product.id}
                                                product={product}
                                                onQuantityChange={handleQuantityChange}
                                                onRemove={removeProduct}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Acordeón de información del usuario */}
                            {showUserForm && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold mb-3 text-center">Información de contacto</h2>
                                    
                                    <div className="space-y-4">
                                        <Accordion 
                                            title={isLoggedIn ? 'Datos de usuario' : 'Información personal'}
                                            defaultOpen={true}
                                        >
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <InputLabel htmlFor="email" value="Correo electrónico" />
                                                        <TextInput
                                                            id="email"
                                                            type="email"
                                                            className="mt-1 block w-full"
                                                            value={data.user_data.email}
                                                            onChange={(e) => handleUserDataChange('email', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['user_data.email']} className="mt-2" />
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="phone" value="Teléfono / Móvil" />
                                                        <TextInput
                                                            id="phone"
                                                            type="tel"
                                                            className="mt-1 block w-full"
                                                            value={data.user_data.phone}
                                                            onChange={(e) => handleUserDataChange('phone', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['user_data.phone']} className="mt-2" />
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <InputLabel htmlFor="name" value="Nombre" />
                                                        <TextInput
                                                            id="name"
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            value={data.user_data.name}
                                                            onChange={(e) => handleUserDataChange('name', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['user_data.name']} className="mt-2" />
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="last_name" value="Apellidos" />
                                                        <TextInput
                                                            id="last_name"
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            value={data.user_data.last_name}
                                                            onChange={(e) => handleUserDataChange('last_name', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['user_data.last_name']} className="mt-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion>
                                        
                                        <div className="mt-6">
                                            <button
                                                onClick={handleGoToDelivery}
                                                className="w-full bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors text-lg font-semibold text-center"
                                            >
                                                Ir para la entrega
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Acordeón de información de entrega */}
                            {showDeliveryForm && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 mt-6">
                                    <h2 className="text-lg font-bold mb-3 text-center">Información de entrega</h2>
                                    
                                    <div className="space-y-4">
                                        <Accordion 
                                            title="Datos de entrega"
                                            defaultOpen={true}
                                        >
                                            <div className="space-y-4">
                                                {/* Departamento y Municipio */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <InputLabel htmlFor="department" value="Departamento" />
                                                        <TextInput
                                                            id="department"
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            value={data.delivery_data.department}
                                                            onChange={(e) => handleDeliveryDataChange('department', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['delivery_data.department']} className="mt-2" />
                                                    </div>
                                                    
                                                    <div>
                                                        <InputLabel htmlFor="municipality" value="Municipio" />
                                                        <TextInput
                                                            id="municipality"
                                                            type="text"
                                                            className="mt-1 block w-full"
                                                            value={data.delivery_data.municipality}
                                                            onChange={(e) => handleDeliveryDataChange('municipality', e.target.value)}
                                                            required
                                                        />
                                                        <InputError message={errors['delivery_data.municipality']} className="mt-2" />
                                                    </div>
                                                </div>
                                                
                                                {/* Método de entrega */}
                                                <div>
                                                    <InputLabel value="Método de entrega" />
                                                    <div className="mt-2 space-y-2">
                                                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="delivery_method"
                                                                value="contra_entrega"
                                                                checked={data.delivery_data.delivery_method === 'contra_entrega'}
                                                                onChange={(e) => handleDeliveryDataChange('delivery_method', e.target.value)}
                                                                className="text-blue-600"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="font-semibold">Contra Entrega</div>
                                                                <div className="text-sm text-gray-600">En hasta 4 días hábiles</div>
                                                                <div className="text-sm font-bold text-blue-600">$20.000</div>
                                                            </div>
                                                        </label>
                                                        
                                                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="delivery_method"
                                                                value="envio_domicilio"
                                                                checked={data.delivery_data.delivery_method === 'envio_domicilio'}
                                                                onChange={(e) => handleDeliveryDataChange('delivery_method', e.target.value)}
                                                                className="text-blue-600"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="font-semibold">Envío a Domicilio</div>
                                                                <div className="text-sm font-bold text-blue-600">$5.000</div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                
                                                {/* Dirección de entrega */}
                                                <div>
                                                    <InputLabel value="Complete su dirección de entrega" className="font-semibold" />
                                                    <div className="mt-2 space-y-3">
                                                        <div>
                                                            <InputLabel htmlFor="address" value="Dirección" />
                                                            <TextInput
                                                                id="address"
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                                value={data.delivery_data.address}
                                                                onChange={(e) => handleDeliveryDataChange('address', e.target.value)}
                                                                placeholder="Avenida Calle 23 # 2 - 2"
                                                                required
                                                            />
                                                            <InputError message={errors['delivery_data.address']} className="mt-2" />
                                                        </div>
                                                        
                                                        <div>
                                                            <InputLabel htmlFor="city" value="Ciudad" />
                                                            <TextInput
                                                                id="city"
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                                value={data.delivery_data.city}
                                                                onChange={(e) => handleDeliveryDataChange('city', e.target.value)}
                                                                placeholder="Corozal, Sucre"
                                                                required
                                                            />
                                                            <InputError message={errors['delivery_data.city']} className="mt-2" />
                                                        </div>
                                                        
                                                        <div>
                                                            <InputLabel htmlFor="additional_info" value="Información adicional (ej.: apto. 201)" />
                                                            <TextInput
                                                                id="additional_info"
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                                value={data.delivery_data.additional_info}
                                                                onChange={(e) => handleDeliveryDataChange('additional_info', e.target.value)}
                                                                placeholder="Apto. 201"
                                                            />
                                                            <InputError message={errors['delivery_data.additional_info']} className="mt-2" />
                                                        </div>
                                                        
                                                        <div>
                                                            <InputLabel htmlFor="recipient" value="Destinatario" />
                                                            <TextInput
                                                                id="recipient"
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                                value={data.delivery_data.recipient}
                                                                onChange={(e) => handleDeliveryDataChange('recipient', e.target.value)}
                                                                placeholder="Pepito Perez"
                                                                required
                                                            />
                                                            <InputError message={errors['delivery_data.recipient']} className="mt-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion>
                                        
                                        <div className="mt-6">
                                            <button
                                                onClick={handleGoToPayment}
                                                className="w-full bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors text-lg font-semibold text-center"
                                            >
                                                Ir para el pago
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Acordeón de información de pago */}
                            {showPaymentForm && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 mt-6">
                                    <h2 className="text-lg font-bold mb-3 text-center">Información de pago</h2>
                                    
                                    <div className="space-y-4">
                                        <Accordion 
                                            title="Método de pago"
                                            defaultOpen={true}
                                        >
                                            <div className="space-y-4">
                                                {/* Opciones de pago */}
                                                <div>
                                                    <InputLabel value="Opciones de pago disponibles" />
                                                    <div className="mt-2 space-y-2">
                                                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="payment_method"
                                                                value="pse"
                                                                checked={selectedPaymentMethod === 'pse'}
                                                                onChange={(e) => handlePaymentMethodChange('pse')}
                                                                className="text-blue-600"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="font-semibold">PSE</div>
                                                            </div>
                                                        </label>
                                                        
                                                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="payment_method"
                                                                value="efecty"
                                                                checked={selectedPaymentMethod === 'efecty'}
                                                                onChange={(e) => handlePaymentMethodChange('efecty')}
                                                                className="text-blue-600"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="font-semibold">Efecty</div>
                                                            </div>
                                                        </label>
                                                        
                                                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="payment_method"
                                                                value="tarjeta"
                                                                checked={selectedPaymentMethod === 'tarjeta'}
                                                                onChange={(e) => handlePaymentMethodChange('tarjeta')}
                                                                className="text-blue-600"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="font-semibold">Tarjeta de crédito</div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                
                                                {/* Mensaje de método no disponible */}
                                                {showUnavailableMessage && (
                                                    <div className="text-center py-4">
                                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                            <p className="text-yellow-800 font-medium">
                                                                Este método de pago aún no está disponible.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Selección de banco para PSE */}
                                                {selectedPaymentMethod === 'pse' && (
                                                    <div>
                                                        <InputLabel value="Escoge tu banco para continuar con el pago" />
                                                        <div className="mt-2 space-y-2">
                                                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="bank"
                                                                    value="nequi"
                                                                    checked={selectedBank === 'nequi'}
                                                                    onChange={(e) => {
                                                                        setSelectedBank(e.target.value);
                                                                        handlePaymentDataChange('bank', e.target.value);
                                                                            // Abrir flujo de Nequi al seleccionar Nequi
                                                                            setShowNequiModal(true);
                                                                    }}
                                                                    className="text-blue-600"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="font-semibold">Nequi</div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Accordion>
                                        
                                        
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Columna lateral - Resumen de la compra */}
                        <div className="xl:col-span-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 border border-gray-100">
                                {/* Botón Volver */}
                                <div className="mb-4">
                                    <button
                                        onClick={() => window.history.back()}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                                    >
                                        ← Volver
                                    </button>
                                </div>
                                
                                <h2 className="text-lg font-bold mb-3 text-center">Resumen de la compra</h2>
                                
                                <div className="space-y-3 mb-6">
                                    {data.cart_products.map((product) => (
                                        <div key={product.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                            {product.imagen && (
                                                <img
                                                    src={product.imagen}
                                                    alt={product.nombre}
                                                    className="w-12 h-12 object-contain rounded-md flex-shrink-0"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-xs">{product.nombre}</p>
                                                <p className="text-gray-600 text-xs">
                                                    ${product.precio.toLocaleString()} x {product.cantidad}
                                                </p>
                                            </div>
                                            <p className="font-bold text-sm">
                                                ${product.subtotal.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Subtotal:</span>
                                        <span className="font-bold text-sm">${currentSubtotal.toLocaleString()}</span>
                                    </div>
                                    {shippingCost > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm">Gastos del envío:</span>
                                            <span className="font-bold text-sm">${shippingCost.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-base font-bold bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg">
                                        <span>Total:</span>
                                        <span className="text-blue-600">${currentTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                        />
                                        <label className="text-xs text-gray-700">
                                            Confirmo que soy mayor de edad y acepto los{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                                                Términos y Condiciones
                                            </a>{' '}
                                            de la Política de Tratamiento de Datos.
                                            He leído y acepto el tratamiento de mis datos personales de acuerdo a la autorización expuesta.{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                                                [Aquí]
                                            </a>
                                        </label>
                                    </div>
                                    
                                    {!showUserForm && (
                                        <button
                                            onClick={handleProceedToPayment}
                                            disabled={!termsAccepted || data.cart_products.length === 0}
                                            className="w-full bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors text-lg font-semibold text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#8B7355]"
                                        >
                                            Proceder al pago
                                        </button>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modals */}
                    {showPseModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Datos de pago</h3>
                                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowPseModal(false)}>✕</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel value="Tipo de documento" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={pseForm.documentType}
                                            onChange={(e) => setPseForm({ ...pseForm, documentType: e.target.value })}
                                        >
                                            <option value="cc">Cédula de ciudadanía</option>
                                            <option value="ce">Cédula de extranjería</option>
                                            <option value="nit">NIT</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Número de documento" />
                                        <TextInput
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={pseForm.documentNumber}
                                            onChange={(e) => setPseForm({ ...pseForm, documentNumber: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Tipo de persona" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={pseForm.personType}
                                            onChange={(e) => setPseForm({ ...pseForm, personType: e.target.value })}
                                        >
                                            <option value="natural">Persona natural</option>
                                            <option value="juridica">Persona jurídica</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Banco" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={pseForm.bank}
                                            onChange={(e) => setPseForm({ ...pseForm, bank: e.target.value })}
                                        >
                                            <option value="bancolombia">Bancolombia</option>
                                            <option value="bbva">BBVA</option>
                                            <option value="davivienda">Davivienda</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Nombre del titular" />
                                        <TextInput
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={pseForm.holderName}
                                            onChange={(e) => setPseForm({ ...pseForm, holderName: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                        <span className="font-medium">Cantidad</span>
                                        <span className="font-bold text-blue-600">${(currentTotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            className="flex-1 bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors"
                                            onClick={() => {
                                                // Simulación de envío
                                                alert('Pago PSE simulado.');
                                                setShowPseModal(false);
                                            }}
                                        >
                                            Pagar
                                        </button>
                                        <button className="px-4 py-2 rounded-lg border" onClick={() => setShowPseModal(false)}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showNequiModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Datos de pago (Nequi)</h3>
                                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowNequiModal(false)}>✕</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel value="Tipo de documento" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={nequiForm.documentType}
                                            onChange={(e) => setNequiForm({ ...nequiForm, documentType: e.target.value })}
                                        >
                                            <option value="cc">Cédula de ciudadanía</option>
                                            <option value="ce">Cédula de extranjería</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Tipo de persona" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={nequiForm.personType}
                                            onChange={(e) => setNequiForm({ ...nequiForm, personType: e.target.value })}
                                        >
                                            <option value="natural">Persona natural</option>
                                            <option value="juridica">Persona jurídica</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Banco" />
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                            value={nequiForm.bank}
                                            onChange={(e) => setNequiForm({ ...nequiForm, bank: e.target.value })}
                                        >
                                            <option value="nequi">Nequi</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                        <span className="font-medium">Cantidad</span>
                                        <span className="font-bold text-blue-600">${(currentTotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            className="flex-1 bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors"
                                            onClick={() => {
                                                setShowNequiModal(false);
                                                setShowNequiAuthModal(true);
                                            }}
                                        >
                                            Pagar
                                        </button>
                                        <button className="px-4 py-2 rounded-lg border" onClick={() => setShowNequiModal(false)}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showNequiAuthModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Nequi</h3>
                                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowNequiAuthModal(false)}>✕</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel value="Número de celular" />
                                        <TextInput
                                            type="tel"
                                            className="mt-1 block w-full"
                                            value={nequiAuthForm.phone}
                                            onChange={(e) => setNequiAuthForm({ ...nequiAuthForm, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Clave" />
                                        <TextInput
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={nequiAuthForm.password}
                                            onChange={(e) => setNequiAuthForm({ ...nequiAuthForm, password: e.target.value })}
                                        />
                                    </div>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={nequiAuthForm.notRobot}
                                            onChange={(e) => setNequiAuthForm({ ...nequiAuthForm, notRobot: e.target.checked })}
                                        />
                                        <span>No soy un robot</span>
                                    </label>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            className="flex-1 bg-[#4B3A3A] text-white py-2 rounded-lg hover:bg-[#2B1F1F] transition-colors"
                                            onClick={async () => {
                                                if (!nequiAuthForm.phone || !nequiAuthForm.password || !nequiAuthForm.notRobot) {
                                                    alert('Completa los campos para continuar.');
                                                    return;
                                                }
                                                try {
                                                    const payload = {
                                                        items: (data.cart_products || []).map(p => ({
                                                            producto_id: p.id,
                                                            quantity: p.cantidad,
                                                        })),
                                                        delivery: {
                                                            delivery_method: data.delivery_data.delivery_method,
                                                            address: data.delivery_data.address,
                                                            city: data.delivery_data.city,
                                                            department: data.delivery_data.department,
                                                            municipality: data.delivery_data.municipality,
                                                            additional_info: data.delivery_data.additional_info,
                                                            recipient: data.delivery_data.recipient,
                                                        },
                                                        payment: {
                                                            method: 'nequi',
                                                            bank: 'nequi',
                                                            phone: nequiAuthForm.phone,
                                                            person_type: nequiForm.personType,
                                                            document_type: nequiForm.documentType,
                                                        },
                                                        totals: {
                                                            subtotal: toIntAmount(currentSubtotal),
                                                            shipping: toIntAmount(shippingCost),
                                                            total: toIntAmount(currentTotal),
                                                        },
                                                    };
                                                    const res = await fetch('/transacciones/compra', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'X-Requested-With': 'XMLHttpRequest',
                                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                                                        },
                                                        credentials: 'same-origin',
                                                        body: JSON.stringify(payload),
                                                    });
                                                    if (!res.ok) {
                                                        const err = await res.json().catch(() => ({}));
                                                        throw new Error(err.message || 'No se pudo registrar la compra simulada');
                                                    }
                                                    const json = await res.json();
                                                    alert('Simulación de ingreso a Nequi. Compra registrada #' + json.transaccion_id);
                                                } catch (err) {
                                                    console.error(err);
                                                    alert('Hubo un problema registrando la compra simulada.');
                                                } finally {
                                                    setShowNequiAuthModal(false);
                                                }
                                            }}
                                        >
                                            Entrar
                                        </button>
                                        <button className="px-4 py-2 rounded-lg border" onClick={() => setShowNequiAuthModal(false)}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
} 