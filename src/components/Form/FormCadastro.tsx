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
import { api as apiFunction } from '../../services/api';
import { initializeApp } from 'firebase/app';
import { setCookie } from 'nookies';
import Router, { useRouter } from 'next/router';
import { formatDateToBackend } from '../../functions/formatDateToBackEnd';
import { auth } from '../../services/firebaseConfig';

type CreateUserFormData = {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name: string;
    birthDate: Date;
    targetLanguage: any;
    nativeLanguage: any;
};

const signInLoggedFormSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    birthDate: yup.date().required('A data de nascimento é obrigatória'),
    targetLanguage: yup.string().required('Idioma de interesse é obrigatório'),
    nativeLanguage: yup.string().required('Idioma nativo é obrigatório'),
});

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    name: yup.string().required('O nome é obrigatório'),
    birthDate: yup.date().required('A data de nascimento é obrigatória'),
    password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve possuir ao menos 6 caracteres'),
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

    const [targetLanguages, setTargetLanguages] = useState<TargetLanguage[]>([]);

    let api = apiFunction();

    useEffect(() => {
        api.get('targetLanguages')
            .then((response) => setTargetLanguages(response.data))
            .catch((err) => console.log(err));
    }, []);

    const [nativeLanguages, setNativeLanguages] = useState<NativeLanguage[]>([]);
    useEffect(() => {
        api.get('nativeLanguages')
            .then((response) => setNativeLanguages(response.data))
            .catch((err) => console.log(err));
    }, []);

    const resolver = isLogged ? yupResolver(signInLoggedFormSchema) : yupResolver(signInFormSchema);

    const { register, handleSubmit, formState } = useForm({
        resolver: resolver,
    });
    const { errors } = formState;

    const toast = useToast();

    const handleSignUp: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        let { email, password, name, birthDate, targetLanguage, nativeLanguage } = values;

        targetLanguage = JSON.parse(targetLanguage);
        nativeLanguage = JSON.parse(nativeLanguage);

        const birthDateFormatted = formatDateToBackend(birthDate);
       
        if (nativeLanguage.idNativeLanguage === targetLanguage.idTargetLanguage) {
            return toast({
                title: 'O IDIOMA NATIVO, E O IDIOMA DE INTERESSE DEVEM SER DIFERENTES.',
                status: 'error',
                isClosable: true,
                position: 'top',
            });
        }

        if (isLogged) {
            return api
                .post('users', {
                    userName: name,
                    birthDate: birthDateFormatted,
                    nativeLanguage,
                    targetLanguage,
                })
                .then((response: any) => {
                    toast({
                        title: 'CONTA CRIADA COM SUCESSO!',
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });

                    Router.push('/Posts');
                })
                .catch((error: any) => {
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
                });
        }

        setPersistence(auth, browserSessionPersistence).then(() => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: any) => {
                    const { user } = userCredential;
                    const { accessToken: idToken } = user;

                    setCookie(undefined, 'firebaseAccount', idToken, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/',
                    });

                    api = apiFunction();

                    api.post('users', {
                        userName: name,
                        birthDate: birthDateFormatted,
                        nativeLanguage,
                        targetLanguage,
                    })
                        .then((response: any) => {
                            toast({
                                title: 'CONTA CRIADA COM SUCESSO!',
                                status: 'success',
                                isClosable: true,
                                position: 'top',
                            });

                            Router.push('/Posts');
                        })
                        .catch((error: any) => {
                            toast({
                                title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                                status: 'error',
                                isClosable: true,
                                position: 'top',
                            });

                            deleteUser(user);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);

                    if (errorCode === 'auth/email-already-in-use') {
                        return toast({
                            title: 'ESTE E-MAIL JÁ ESTÁ SENDO UTILIZADO.',
                            status: 'error',
                            isClosable: true,
                            position: 'top',
                        });
                    }
                    toast({
                        title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                        status: 'error',
                        isClosable: true,
                        position: 'top',
                    });
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
            {isLogged && (
                <Text color="howdyColors.mainBlack" mb="30px" fontSize="1.5rem">
                    QUASE ACABANDO!
                </Text>
            )}
            {!isLogged && (
                <InputGroup width="90%" variant="filled" marginBottom="10px">
                    <InputLeftElement pointerEvents="none">
                        <MdOutlineMailOutline color="#6A7DFF" />
                    </InputLeftElement>
                    <Input
                        fontWeight="medium"
                        name="email"
                        placeholder="Seu e-mail"
                        type="text"
                        error={errors.email}
                        {...register('email')}
                    />
                </InputGroup>
            )}

            <InputGroup width={400} variant="filled" marginBottom="10px">
                <InputLeftElement pointerEvents="none">
                    <BsPerson color="#6A7DFF" />
                </InputLeftElement>
                <Input
                    fontWeight="medium"
                    name="name"
                    placeholder="Seu nome"
                    type="text"
                    error={errors.name}
                    {...register('name')}
                />
            </InputGroup>

            <InputGroup width={400} variant="filled" marginBottom="10px">
                <InputLeftElement pointerEvents="none">
                    <MdOutlineCake color="#6A7DFF" />
                </InputLeftElement>
                <Input
                    fontWeight="medium"
                    name="birthDate"
                    placeholder="Sua data de nascimento"
                    onFocus={() => document.getElementById('birthDate').setAttribute('type', 'date')}
                    type="text"
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
                            fontWeight="medium"
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
                            fontWeight="medium"
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
                CADASTRAR
            </Button>

            <Flex width="100%" maxWidth={510} align="center" justify="center" borderRadius={8} flexDir="row"></Flex>
        </Flex>
    );
}
