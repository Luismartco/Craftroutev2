import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />
            <h1 className="text-3xl font-bold text-[#2B1F1F] mb-6 text-center">Iniciar Sesión</h1>
            
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="w-full max-w-md mx-auto">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Correo electrónico"
                        className="w-full p-4 mb-5 border border-gray-300 rounded"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Contraseña"
                        className="w-full p-4 mb-6 border border-gray-300 rounded"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mb-4 flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Recuérdame
                    </span>
                </div>

                {canResetPassword && (
                    <div className="mb-4 text-right">
                        <Link
                            href={route('password.request')}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#2B1F1F] text-white py-4 rounded hover:bg-opacity-90 transition"
                    disabled={processing}
                >
                    Iniciar sesión
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿No tienes una cuenta?{' '}
                    <Link href={route('register')} className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}

