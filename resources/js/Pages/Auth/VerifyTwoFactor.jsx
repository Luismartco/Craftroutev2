
import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function VerifyTwoFactor({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        two_factor_code: '',
    });

    useEffect(() => {
        return () => {
            reset('two_factor_code');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('2fa.store'));
    };

    return (
        <GuestLayout>
            <Head title="Verificación de Dos Pasos" />

            <div className="mb-4 text-sm text-gray-600">
                Este es un paso adicional de seguridad. Por favor ingresa el código de verificación que enviamos a tu correo electrónico.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="two_factor_code" value="Código de Verificación" />

                    <TextInput
                        id="two_factor_code"
                        type="text"
                        name="two_factor_code"
                        value={data.two_factor_code}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('two_factor_code', e.target.value)}
                    />

                    <InputError message={errors.two_factor_code} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <a
                        href={route('2fa.resend')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Re-enviar código
                    </a>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Verificar
                    </PrimaryButton>
                </div>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); post(route('logout')); }}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
