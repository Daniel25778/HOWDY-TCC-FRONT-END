import {
    Box,
    Center,
    Flex,
    Image,
    InputGroup,
    InputLeftElement,
    Select,
    Input,
    Text,
    FormControl,
    FormErrorMessage,
    useToast,
    Button,
} from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCalendar3, BsCamera, BsPerson } from 'react-icons/bs';
import { GiPadlock } from 'react-icons/gi';
import { MdArrowDropDown, MdOutlineCake, MdOutlineDescription, MdOutlineMailOutline } from 'react-icons/md';
import UserDataPage from '../components/UserDataPage/UserDataPage';
import { getUserLogged } from '../functions/getUserLogged';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input as MyInput } from '../components/Form/Input';
import { formatDateToBackend } from '../functions/formatDateToBackEnd';
import { api as apiFunction } from '../services/api';
import Router, { useRouter } from 'next/router';
import { useEffect, useState,useRef } from 'react';
// import { storage } from '../services/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { updatePassword } from 'firebase/auth';
import {auth} from '../services/firebaseConfig';

type editUserFormData = {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    name: string;
    birthDate: Date;
    targetLanguage: any;
    nativeLanguage: any;
    description: string;
};

const editFormSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido'),
    birthDate: yup.date().required('A data de nascimento é obrigatória'),
    password: yup.string().required('Senha é obrigatória').min(6, 'A senha deve possuir ao menos 6 caracteres'),
    passwordConfirm: yup
        .string()
        .required('Confirmação de senha é obrigatória')
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
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

export default function PageUserConfig() {

    const resolver = yupResolver(editFormSchema);

    const toast = useToast();
    const router = useRouter();

    const { register, handleSubmit, formState } = useForm({
        resolver: resolver,
    });
    const { errors } = formState;

    let api = apiFunction();
    const [userLogged, setUserLogged] = useState<any>(null);
    const [targetLanguages, setTargetLanguages] = useState<TargetLanguage[]>([]);
    const [user, setUser] = useState<any>('nulo');
    const [nativeLanguages, setNativeLanguages] = useState<NativeLanguage[]>([]);
    const [attachedBackgroundImage, setAttachedBackgroundImage] = useState<boolean>(false);
    const [attachedProfileImage, setAttachedProfileImage] = useState<boolean>(false);
    const backgroundImageRef = useRef(null);
    const profilePhotoImageRef = useRef(null);

    function handleBackProfile() {
        Router.push(`/UserPage/Post/${userLogged.idUser}`);
    }

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);

                api.get(`users/${userLogged?.idUser}`).then((response) => {
                    response.data && setUser(response.data[0]);
                    console.log(user);
                });

                api.get('nativeLanguages')
                    .then((response) => setNativeLanguages(response.data))
                    .catch((err) => console.log(err));

                api.get('targetLanguages')
                    .then((response) => setTargetLanguages(response.data))
                    .catch((err) => console.log(err));
            });
        }
    }, [router.isFallback]);
    
    function uploadImage() {
        setAttachedBackgroundImage(false);
        setAttachedProfileImage(false);

        const fileBackground = backgroundImageRef.current.files[0];
        const fileProfilePhoto = profilePhotoImageRef.current.files[0];
        
        const fileReaderBackground = new FileReader();
        const fileReaderProfilePhoto = new FileReader();

        if (fileBackground) {
            fileReaderBackground.readAsDataURL(fileBackground);
        }

        fileReaderBackground.onloadend = () => {
            setAttachedBackgroundImage(true);
        };

        if (fileProfilePhoto) {
            fileReaderProfilePhoto.readAsDataURL(fileProfilePhoto);
        }

        fileReaderProfilePhoto.onloadend = () => {
            setAttachedProfileImage(true);
        };
    }

    function sendProfilePhotoAndBackgroundImage(e) {
        e.preventDefault();
        //@ts-ignore
        const inputDescriptionUser = document.getElementById('inputDescriptionUser')?.value;
        const inputNewPassword = document.getElementById('inputNewPassword')?.value;
        const inputUserName = document.getElementById('inputUserName')?.value;
        const inputUserDate = document.getElementById('birthDate')?.value;
        const selectNativeLanguage = document.getElementById('nativeLanguage')?.value;
        const selectTargetLanguage = document.getElementById('targetLanguage')?.value;
        const selectNativeLanguageFormatted = JSON.parse(selectNativeLanguage);
        const selectTargetLanguageFormatted = JSON.parse(selectTargetLanguage);
        console.log("ssss"+inputNewPassword);
        console.log("ssss"+selectTargetLanguageFormatted.idTargetLanguage);
        const newTargetLanguage = selectTargetLanguageFormatted.idTargetLanguage
        const newNativeLanguage = selectNativeLanguageFormatted.idNativeLanguage
        const formData = new FormData();

        const userFirebase = auth.currentUser;
        console.log('!' + userFirebase);
        updatePassword(userFirebase, inputNewPassword).then(() => {
            console.log('Senha atualizada com sucesso!');
        }).catch(() => {

        });

        if (backgroundImageRef.current.files.length === 1 && attachedBackgroundImage !== false && profilePhotoImageRef.current.files.length === 1 && attachedProfileImage !== false)
            formData.append('backgroundImageFile', backgroundImageRef.current.files[0]);
            formData.append('profilePhotoFile', profilePhotoImageRef.current.files[0]);
            formData.append('description', inputDescriptionUser);
            formData.append('userName', inputUserName);
            formData.append('birthDate', inputUserDate);
            formData.append('idTargetLanguage', newTargetLanguage);
            formData.append('idNativeLanguage', newNativeLanguage);

        api.put(`users`, formData)
            .then((response) => {
                console.log('res', response);
                toast({
                    title: 'EDIÇÃO REALIZADA COM SUCESSO!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                });
                handleBackProfile();
            })
            .catch((error) => {
                switch (error.response.data.error) {
                    case 'The text is not written according to the language you want to learn':
                        toast({
                            title: 'BLA BLA BLA',
                            status: 'error',
                            isClosable: true,
                            position: 'top',
                        });
                        break;

                    default:
                        toast({
                            title: 'OCORREU UM ERRO NA EDIÇÃO',
                            status: 'error',
                            isClosable: true,
                            position: 'top',
                        });
                        break;

                }
            });
    }

    return (
       
        <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={'center'} align="center" padding="2%">
             <Input type="file" display="none" ref={backgroundImageRef} onChange={uploadImage} />
             <Input type="file" display="none" ref={profilePhotoImageRef} onChange={uploadImage} />
            <Flex w="50%" bg="white" align="center" justify="center" borderRadius={8} flexDir="column">
                <Flex w="100%" justifyContent={'flex-end'} p="3%">
                    <Text
                        alignSelf={'flex-end'}
                        color="howdyColors.mainBlack"
                        fontWeight={'bold'}
                        fontSize={['sm', 'md', 'xx-large']}
                    >
                        Configurações
                    </Text>
                </Flex>

                <Image objectFit="cover" w="100%" h="20rem" src={userLogged?.backgroundImage} />
                

                
                

                <Flex justify={'center'} align="center" position={'relative'} flexDir={'row'} bottom="2vw">
                    <Button
                        w="100%"    
                        onClick={() => {
                        console.log(`Teste`);
                        backgroundImageRef.current.click();
                        }}
                        >
                        {<BsCamera color="#2EC4F3" size="50%" />}
                    </Button>

                    <Button
                        w="100%"    
                        onClick={() => {
                        console.log(`Teste`);
                        profilePhotoImageRef.current.click();
                        }}
                        >
                        {<BsCamera color="#2EC4F3" size="50%" />}
                    </Button>
                    <Image
                        w="100%"
                        h="10rem"
                        borderRadius="100%"
                        objectFit="cover"
                        src={userLogged?.profilePhoto}
                        _hover={{ cursor: 'pointer' }}
                    />
                </Flex>

                <Flex
                    as="form"
                    padding="10"
                    bg="white"
                    align="center"
                    justify="center"
                    borderRadius={8}
                    flexDir="column"
                    width="70%"
                >
                    <Flex align="center" width="100%">
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Nome do usuário
                        </Text>
                    </Flex>

                    <InputGroup width="100%" variant="filled" marginBottom="15px">
                        <InputLeftElement pointerEvents="none">
                            <BsPerson color="#6A7DFF" />
                        </InputLeftElement>
                        <MyInput
                            fontWeight="medium"
                            id='inputUserName'
                            name="inputUserName"
                            placeholder={userLogged?.userName}
                            type="text"
                            error={errors.name}
                            {...register('name')}
                        />
                    </InputGroup>

                    <Flex align="center" width="100%">
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Data de nascimento
                        </Text>
                    </Flex>

                    <InputGroup width="100%" variant="filled" marginBottom="15px">
                        <InputLeftElement pointerEvents="none">
                            <MdOutlineCake color="#6A7DFF" />
                        </InputLeftElement>
                        <MyInput
                            fontWeight="medium"
                            name="inputUserDate"
                            placeholder="Data nascimento"
                            onFocus={() => document.getElementById('birthDate').setAttribute('type', 'date')}
                            type="text"
                            error={errors.birthDate}
                            {...register('birthDate')}
                        />
                    </InputGroup>

                    <Flex align="center" width="100%">
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Descrição
                        </Text>
                    </Flex>

                    <InputGroup width="100%" variant="filled" marginBottom="15px">
                        <InputLeftElement pointerEvents="none">
                            <MdOutlineDescription color="#6A7DFF" />
                        </InputLeftElement>
                        <MyInput
                            fontWeight="medium"
                            id='inputDescriptionUser'
                            name="inputDescriptionUser"
                            placeholder={userLogged?.description}
                            type="text"
                            error={errors.description}
                            {...register('description')}
                        />
                    </InputGroup>

                    <FormControl isInvalid={!!errors.nativeLanguage}>
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Idioma nativo
                        </Text>
                        <Select
                            mb="15px"
                            placeholder={userLogged?.nativeLanguageName}
                            variant="filled"
                            iconColor="howdyColors.mainBlue"
                            icon={<MdArrowDropDown />}
                            {...register('nativeLanguage')}
                            name={'nativeLanguage'}
                            id={'nativeLanguage'}
                        >
                            {nativeLanguages &&
                                nativeLanguages.map((nativeLanguage) => (
                                    <option
                                        key={nativeLanguage.idNativeLanguage}
                                        value={JSON.stringify(nativeLanguage)}
                                    >
                                        {nativeLanguage.nativeLanguageName}
                                    </option>
                                ))}
                        </Select>
                        {!!errors && <FormErrorMessage>{errors?.nativeLanguage?.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.targetLanguage}>
                        <Flex align="center" width="100%">
                            <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                                Idioma de interesse
                            </Text>
                        </Flex>
                        <Select
                            mb="15px"
                            placeholder={userLogged?.targetLanguageName}
                            variant="filled"
                            iconColor="howdyColors.mainBlue"
                            icon={<MdArrowDropDown />}
                            {...register('targetLanguage')}
                            name={'targetLanguage'}
                            id={'targetLanguage'}
                        >
                            {targetLanguages &&
                                targetLanguages.map((targetLanguage) => (
                                    <option
                                        key={targetLanguage.idTargetLanguage}
                                        value={JSON.stringify(targetLanguage)}
                                    >
                                        {targetLanguage.targetLanguageName}
                                    </option>
                                ))}
                        </Select>
                        {!!errors && <FormErrorMessage>{errors?.targetLanguage?.message}</FormErrorMessage>}
                    </FormControl>

                    <Flex align="center" width="100%">
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Senha
                        </Text>
                    </Flex>

                    <InputGroup width="100%" variant="filled" marginBottom="15px">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <MyInput
                            fontWeight="medium"
                            name="password"
                            placeholder="Sua senha"
                            id="inputNewPassword"
                            type="password"
                            error={errors.password}
                            {...register('password')}
                        />
                    </InputGroup>

                    <Flex align="center" width="100%">
                        <Text color="howdyColors.mainBlack" fontWeight={'bold'} fontSize={['sm', 'md', 'large']}>
                            Confirmação de senha
                        </Text>
                    </Flex>

                    <InputGroup width="100%" variant="filled" marginBottom="15px">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <MyInput
                            fontWeight="medium"
                            name="passwordConfirm"
                            placeholder="Confirme sua senha"
                            type="password"
                            error={errors.passwordConfirm}
                            {...register('passwordConfirm')}
                        ></MyInput>
                    </InputGroup>

                    <Button
                        _hover={{ bg: '#B9C2FD' }}
                        width="100%"
                        maxWidth={400}
                        marginTop="6"
                        bg="#CBD2FF"
                        color="howdyColors.mainBlue"
                        type="submit"
                        onClick={sendProfilePhotoAndBackgroundImage}
                        isLoading={formState.isSubmitting}
                    >
                        SALVAR
                    </Button>

                    <Button
                        _hover={{ bg: '#B9C2FD' }}
                        width="100%"
                        maxWidth={400}
                        marginTop="6"
                        marginBottom="6"
                        onClick={handleBackProfile}
                        bg="howdyColors.amateur"
                        color="howdyColors.mainBlack"
                        type="button"
                    >
                        CANCELAR
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
}
