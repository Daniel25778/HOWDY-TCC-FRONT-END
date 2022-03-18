import {
    Button,
    Flex,
    InputGroup,
    InputLeftElement,
    Text,
    Select,
    FormControl,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    getAuth,
    createUserWithEmailAndPassword,
    deleteUser,
    browserSessionPersistence,
    setPersistence,
} from 'firebase/auth';
import { MdOutlineMailOutline, MdArrowDropDown, MdOutlineCake } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { FaBaby } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../services/firebaseConfig';
import { setCookie } from 'nookies';
import Router from 'next/router';

type CreateUserFormData = {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name: string;
    birthDate: string;
    targetLanguage: any;
    nativeLanguage: any;
};

const signInLoggedFormSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    birthDate: yup.string().required('A data de nascimento é obrigatória'),
    targetLanguage: yup.string().required('Idioma de interesse é obrigatório'),
    nativeLanguage: yup.string().required('Idioma nativo é obrigatório'),
});

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    name: yup.string().required('O nome é obrigatório'),
    birthDate: yup.string().required('A data de nascimento é obrigatória'),
    password: yup.string().required('Senha é obrigatória').min(4, 'A senha deve possuir ao menos 6 caracteres'),
    passwordConfirm: yup
        .string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
    targetLanguage: yup.string().required('Idioma de interesse é obrigatório'),
    nativeLanguage: yup.string().required('Idioma nativo é obrigatório'),
});

interface TargetLanguage {
    idTargetLanguage: number;
    targetLanguageName: string;
    targetLanguageTranslatorName: string;
}
interface NativeLanguage {
    idNativeLanguage: number;
    nativeLanguageName: string;
    nativeLanguageTranslatorName: string;
}
interface FormCadastroProps {
    isLogged: string;
}

export function FormCadastro(props: FormCadastroProps) {
    const { isLogged: getData } = props;
    const isLogged = getData === 'isLogged';

    initializeApp(firebaseConfig);

    const [targetLanguages, setTargetLanguages] = useState<TargetLanguage[]>([]);
    useEffect(() => {
        api.get('targetLanguages').then((response) => setTargetLanguages(response.data));
    }, []);

    const [nativeLanguages, setNativeLanguages] = useState<NativeLanguage[]>([]);
    useEffect(() => {
        api.get('nativeLanguages').then((response) => setNativeLanguages(response.data));
    }, []);

    const resolver = isLogged ? yupResolver(signInLoggedFormSchema) : yupResolver(signInFormSchema);

    const { register, handleSubmit, formState } = useForm({
        resolver: resolver,
    });
    const { errors } = formState;

    const toast = useToast();

    const handleSignUp: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        let { email, password, passwordConfirm, name, birthDate, targetLanguage, nativeLanguage } = values;
        targetLanguage = JSON.parse(targetLanguage);
        nativeLanguage = JSON.parse(nativeLanguage);

        if (nativeLanguage.idNativeLanguage === targetLanguage.idTargetLanguage) {
            return toast({
                title: 'O IDIOMA NATIVO, E O IDIOMA DE INTERESSE DEVEM SER DIFERENTES.',
                status: 'error',
                isClosable: true,
                position: 'top-right',
            });
        }

        if (isLogged) {
            return api
                .post('users', {
                    userName: name,
                    birthDate,
                    nativeLanguage,
                    targetLanguage,
                })
                .then((response: any) => {
                    toast({
                        title: 'CONTA CRIADA COM SUCESSO',
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });

                    Router.push('../PageUser');
                })
                .catch((error: any) => {
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top-right',
                    });
                });
        }

        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                const { user } = userCredential;
                const { accessToken: idToken } = user;

                setCookie(undefined, 'firebase', idToken, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                });

                api.defaults.headers['Authorization'] = `${idToken}`;

                api.post('users', {
                    userName: name,
                    birthDate,
                    nativeLanguage,
                    targetLanguage,
                })
                    .then((response: any) => {
                        toast({
                            title: 'CONTA CRIADA COM SUCESSO',
                            status: 'success',
                            isClosable: true,
                            position: 'top',
                        });
                    })
                    .catch((error: any) => {
                        toast({
                            title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                            status: 'error',
                            isClosable: true,
                            position: 'top-right',
                        });

                        deleteUser(user);
                    });
            })
            .catch((error) => {
                toast({
                    title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                    status: 'error',
                    isClosable: true,
                    position: 'top-right',
                });
            });
    };

    return (
        <Flex
            as="form"
            onSubmit={handleSubmit(handleSignUp)}
            padding="10"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
        >
            {!isLogged && (
                <InputGroup width={400} variant="filled" marginBottom="10px">
                    <InputLeftElement pointerEvents="none">
                        <MdOutlineMailOutline color="#6A7DFF" />
                    </InputLeftElement>
                    <Input
                        name="email"
                        placeholder="Seu e-mail"
                        type="email"
                        error={errors.email}
                        {...register('email')}
                    />
                </InputGroup>
            )}

            <InputGroup width={400} variant="filled" marginBottom="10px">
                <InputLeftElement pointerEvents="none">
                    <BsPerson color="#6A7DFF" />
                </InputLeftElement>
                <Input name="name" placeholder="Seu nome" type="text" error={errors.name} {...register('name')} />
            </InputGroup>

            <InputGroup width={400} variant="filled" marginBottom="10px">
                <InputLeftElement pointerEvents="none">
                    <MdOutlineCake color="#6A7DFF" />
                </InputLeftElement>
                <Input
                    name="birthDate"
                    placeholder="Sua data de nascimento"
                    type="date"
                    error={errors.birthDate}
                    {...register('birthDate')}
                />
            </InputGroup>

            <FormControl isInvalid={!!errors.nativeLanguage}>
                <Select
                    mb="10px"
                    placeholder="Selecione a língua nativa"
                    variant="filled"
                    iconColor="howdyColors.mainBlue"
                    icon={<MdArrowDropDown />}
                    {...register('nativeLanguage')}
                    name={'nativeLanguage'}
                    id={'nativeLanguage'}
                >
                    {nativeLanguages &&
                        nativeLanguages.map((nativeLanguage) => (
                            <option key={nativeLanguage.idNativeLanguage} value={JSON.stringify(nativeLanguage)}>
                                {nativeLanguage.nativeLanguageName}
                            </option>
                        ))}
                </Select>
                {!!errors && <FormErrorMessage>{errors?.nativeLanguage?.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.targetLanguage}>
                <Select
                    mb="10px"
                    placeholder="Selecione sua língua de interesse"
                    variant="filled"
                    iconColor="howdyColors.mainBlue"
                    icon={<MdArrowDropDown />}
                    {...register('targetLanguage')}
                    name={'targetLanguage'}
                    id={'targetLanguage'}
                >
                    {targetLanguages &&
                        targetLanguages.map((targetLanguage) => (
                            <option key={targetLanguage.idTargetLanguage} value={JSON.stringify(targetLanguage)}>
                                {targetLanguage.targetLanguageName}
                            </option>
                        ))}
                </Select>
                {!!errors && <FormErrorMessage>{errors?.targetLanguage?.message}</FormErrorMessage>}
            </FormControl>

            {!isLogged && (
                <>
                    <InputGroup width={400} variant="filled" marginBottom="10px">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            name="password"
                            placeholder="Sua senha"
                            type="password"
                            error={errors.password}
                            {...register('password')}
                        />
                    </InputGroup>

                    <InputGroup width={400} variant="filled" marginBottom="10px">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            name="passwordConfirm"
                            placeholder="Confirme sua senha"
                            type="password"
                            error={errors.passwordConfirm}
                            {...register('passwordConfirm')}
                        />
                    </InputGroup>
                </>
            )}

            <Button
                _hover={{ bg: '#B9C2FD' }}
                width={400}
                maxWidth={400}
                marginTop="6"
                marginBottom="6"
                bg="#CBD2FF"
                color="howdyColors.mainBlue"
                type="submit"
                isLoading={formState.isSubmitting}
            >
                <Text>CADASTRAR</Text>
            </Button>

            <Flex width="100%" maxWidth={510} align="center" justify="center" borderRadius={8} flexDir="row"></Flex>
        </Flex>
    );
}
