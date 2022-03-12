import { Button, Flex, InputGroup, InputLeftElement, Text, Select } from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { MdOutlineMailOutline, MdArrowDropDown, MdOutlineCake } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { FaBaby } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface FormCadastroProps {
    isLogged: string;
}
type CreateUserFormData = {
    email?: string;
    password?: string;
    name: string;
    birthDate: string;
    idTargetLanguage: number;
    idNativeLanguage: number;
};

const signInFormSchema = yup.object().shape({
    // email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    name: yup.string().required('O nome é obrigatório'),
    birthDate: yup.string().required('A data de nascimento é obrigatória'),
    // password: yup.string().required('Senha é obrigatória'),
    // idTargetLanguage: yup.string().required('Idioma de interesse é obrigatório'),
    // idNativeLanguage: yup.string().required('Idioma nativo é obrigatório'),
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

export function FormCadastro(props: FormCadastroProps) {
    var { isLogged } = props;

    const [targetLanguages, setTargetLanguages] = useState<TargetLanguage[]>([]);
    useEffect(() => {
        api.get('targetLanguages').then((response) => setTargetLanguages(response.data));
    }, []);

    const [nativeLanguages, setNativeLanguages] = useState<NativeLanguage[]>([]);
    useEffect(() => {
        api.get('nativeLanguages').then((response) => setNativeLanguages(response.data));
    }, []);

    const showAllInputs = isLogged !== 'isLogged';

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    });
    const { errors } = formState;

    const handleSignUp: SubmitHandler<CreateUserFormData> = async (values) => {
        console.log('chegou');
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { email, password, name, birthDate, idTargetLanguage, idNativeLanguage } = values;
        console.log({ email, password, name, birthDate, idTargetLanguage, idNativeLanguage });

        if (isLogged) {
            try {
                api.post('users', {
                    userName: name,
                    birthDate,
                    nativeLanguage: {
                        idNativeLanguage: 1,
                        nativeLanguageName: 'teste',
                    },
                    targetLanguage: {
                        idTargetLanguage: 2,
                        targetLanguageName: 'teste',
                    },
                }).then((response) => console.log(response));
            } catch {
                console.log('Error on creating an user');
            }
        }

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // const auth = getAuth();
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //     });
    };

    return (
        <Flex
            as="form"
            onSubmit={handleSubmit(handleSignUp)}
            padding="20"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
        >
            {showAllInputs && (
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
                <Input name="password" placeholder="Seu nome" type="text" error={errors.name} {...register('name')} />
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

            <Select
                mb="10px"
                placeholder="Lingua nativa"
                variant="filled"
                iconColor="howdyColors.mainBlue"
                icon={<MdArrowDropDown />}
                {...register('idTargetLanguage')}
            >
                {nativeLanguages &&
                    nativeLanguages.map((nativeLanguage) => (
                        <option key={nativeLanguage.idNativeLanguage} value={nativeLanguage.idNativeLanguage}>
                            {nativeLanguage.nativeLanguageName}
                        </option>
                    ))}
            </Select>

            <Select
                mb="10px"
                placeholder="Lingua de interesse"
                variant="filled"
                iconColor="howdyColors.mainBlue"
                icon={<MdArrowDropDown />}
                {...register('idNativeLanguage')}
            >
                {targetLanguages &&
                    targetLanguages.map((targetLanguage) => (
                        <option key={targetLanguage.idTargetLanguage} value={targetLanguage.idTargetLanguage}>
                            {targetLanguage.targetLanguageName}
                        </option>
                    ))}
            </Select>

            {showAllInputs && (
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
                            name="password"
                            placeholder="Confirme sua senha"
                            type="password"
                            error={errors.password}
                            {...register('password')}
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
