import { Box, Center, Flex, Image, InputGroup, InputLeftElement, Select, Text, FormControl,
  FormErrorMessage, useToast, Button } from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { BsCalendar3, BsPerson } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { MdArrowDropDown, MdOutlineCake, MdOutlineMailOutline } from "react-icons/md";
import UserDataPage from "../components/UserDataPage/UserDataPage";
import { getUserLogged } from "../functions/getUserLogged";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/Form/Input';
import { formatDateToBackend } from "../functions/formatDateToBackEnd";
import { api as apiFunction } from '../services/api';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";

type editUserFormData = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name: string;
  birthDate: Date;
  targetLanguage: any;
  nativeLanguage: any;
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
  useEffect(() => {
    api.get('targetLanguages')
        .then((response) => setTargetLanguages(response.data))
        .catch((err) => console.log(err));
}, []);
const [user, setUser] = useState<any>('nulo');
const [nativeLanguages, setNativeLanguages] = useState<NativeLanguage[]>([]);
useEffect(() => {
    api.get('nativeLanguages')
        .then((response) => setNativeLanguages(response.data))
        .catch((err) => console.log(err));
}, []);

useEffect(() => {
  if(!router.isFallback) {
      getUserLogged(api).then((res) => {
          setUserLogged(res);


        api.get(`users/${userLogged?.idUser}`).then(response => {
            response.data && setUser(response.data[0]);
            console.log(user)
        });


      });
     
  }
} , [router.isFallback]);

  const handleEditUser: SubmitHandler<editUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let { email, password, name, birthDate, targetLanguage, nativeLanguage } = values;

    targetLanguage = JSON.parse(targetLanguage);
    nativeLanguage = JSON.parse(nativeLanguage);

    console.log(targetLanguage);

    const birthDateFormatted = formatDateToBackend(birthDate);
   
    if (nativeLanguage.idNativeLanguage === targetLanguage.idTargetLanguage) {
        return toast({
            title: 'O IDIOMA NATIVO, E O IDIOMA DE INTERESSE DEVEM SER DIFERENTES.',
            status: 'error',
            isClosable: true,
            position: 'top',
        });
    }
        api.put('users', {
                userName: name,
                birthDate: birthDateFormatted,
                idTargetLanguage :  targetLanguage.idTargetLanguage,
                idNativeLanguage :  nativeLanguage.idNativeLanguage,
            })
            .then((response: any) => {
                toast({
                    title: 'EDIÇÃO REALIZADA COM SUCESSO!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                });

                Router.push(`/UserPage/Post/${userLogged.idUser}`);
            })
            .catch((error: any) => {
                toast({
                    title: 'OPS... ALGO DE ERRADO OCORREU, TENTE NOVAMENTE.',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                });
            });
    };
    return (
    <Flex w="100%" bg="howdyColors.mainBlue" justifyContent={"center"} align="center" padding="2%">
        
          <Flex
            w="50%"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
          >
            <Flex w="100%" justifyContent={"flex-end"} p="3%">
              <Text
                  alignSelf={"flex-end"} 
                  color="howdyColors.mainBlack"
                  fontWeight={'bold'}
                  fontSize={['sm', 'md', 'xx-large']}
                  >
                    Configurações
              </Text>
            </Flex>
            
            <Image
                  objectFit="cover"
                  w="100%"
                  h="20rem"
                  src={userLogged?.backgroundImage}
              />

            <Flex justify={"center"} align="center" position={"relative"} flexDir={"column"} bottom="2vw" >  
              
                    <Image
                      w="100%"
                      h="10rem"
                      borderRadius="100%"
                      objectFit="cover"
                      src={userLogged?.profilePhoto}
                      _hover={{cursor: 'pointer'}}    
                  />
            </Flex>

            <Flex
            as="form"
            onSubmit={handleSubmit(handleEditUser)}
            padding="10"
            bg="white"
            align="center"
            justify="center"
            borderRadius={8}
            flexDir="column"
            width="70%"
            >      

                    <Flex align="center" width="100%">
                          <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'bold'}
                                fontSize={['sm', 'md', 'large']}
                                >
                                  Nome do usuário
                          </Text>
                    </Flex>
            
                  <InputGroup width="100%" variant="filled" marginBottom="15px">
                      <InputLeftElement pointerEvents="none">
                          <BsPerson color="#6A7DFF" />
                      </InputLeftElement>
                      <Input
                          fontWeight="medium"
                          name="name"
                          placeholder={userLogged?.userName}
                          type="text"
                          error={errors.name}
                          {...register('name')}
                      />
                  </InputGroup>

                  <Flex align="center" width="100%">
                          <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'bold'}
                                fontSize={['sm', 'md', 'large']}
                                >
                                 E-mail
                          </Text>
                    </Flex>

                  <InputGroup width="100%" variant="filled" marginBottom="10px">
                    <InputLeftElement pointerEvents="none">
                        <MdOutlineMailOutline color="#6A7DFF" />
                    </InputLeftElement>
                    <Input
                        fontWeight="medium"
                        name="email"
                        placeholder="E-mail"
                        type="text"
                        error={errors.email}
                        {...register('email')}
                    />
                   </InputGroup>

                    <Flex align="center" width="100%">
                          <Text
                                color="howdyColors.mainBlack"
                                fontWeight={'bold'}
                                fontSize={['sm', 'md', 'large']}
                                >
                                  Data de nascimento
                          </Text>
                    </Flex>

                  <InputGroup width="100%" variant="filled" marginBottom="15px">
                      <InputLeftElement pointerEvents="none">
                          <MdOutlineCake color="#6A7DFF" />
                      </InputLeftElement>
                      <Input
                          fontWeight="medium"
                          name="birthDate"
                          placeholder="Data nascimento"
                          onFocus={() => document.getElementById('birthDate').setAttribute('type', 'date')}
                          type="text"
                          error={errors.birthDate}
                          {...register('birthDate')}
                      />
                  </InputGroup>

                  <FormControl isInvalid={!!errors.nativeLanguage}>
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
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
                                  <option key={nativeLanguage.idNativeLanguage} value={JSON.stringify(nativeLanguage)}>
                                      {nativeLanguage.nativeLanguageName}
                                  </option>
                              ))}
                      </Select>
                      {!!errors && <FormErrorMessage>{errors?.nativeLanguage?.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={!!errors.targetLanguage}>
                  <Flex align="center" width="100%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
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
                                  <option key={targetLanguage.idTargetLanguage} value={JSON.stringify(targetLanguage)}>
                                      {targetLanguage.targetLanguageName}
                                  </option>
                              ))}
                      </Select>
                      {!!errors && <FormErrorMessage>{errors?.targetLanguage?.message}</FormErrorMessage>}
                  </FormControl>

                  <Flex align="center" width="100%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Senha
                        </Text>
                  </Flex>

            
                  <InputGroup width="100%" variant="filled" marginBottom="15px">
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

                  <Flex align="center" width="100%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Confirmação de senha
                        </Text>
                  </Flex>

                  <InputGroup width="100%" variant="filled" marginBottom="15px">
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
                     ></Input>
                    </InputGroup> 

                    <Button
                        _hover={{ bg: '#B9C2FD' }}
                        width="100%"
                        maxWidth={400}
                        marginTop="6"
                        bg="#CBD2FF"
                        color="howdyColors.mainBlue"
                        type="submit"
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
                        bg="howdyColors.amateur"
                        color="howdyColors.mainBlack"
                        type="button"
                    >
                        CANCELAR
                    </Button>

            
            </Flex> 

            {/* <Flex
             as="form"
             w="100%"
             bgColor="yellow.600"
             p="5%"
             justifyContent="center"
             align="center"
             flexDir="column"
             >

                <Flex align="center" width="100%" flexDir="column" gap="2rem">

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Nome de usuário
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <BsPerson color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="Helena Pena"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex>

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                              Email  
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                          <AiOutlineMail color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="helenapena@gmail.com"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex>  

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Data de nascimento
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <BsCalendar3 color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="Helena Pena"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex> 

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Senha
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="Senha"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex>

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Confirmação de senha
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="Confirmação de senha"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex>

                    <Flex align="center" width="100%" flexDir="column">
                      
                      <Flex align="center" width="90%">
                        <Text
                              color="howdyColors.mainBlack"
                              fontWeight={'bold'}
                              fontSize={['sm', 'md', 'large']}
                              >
                                Confirmação de senha
                        </Text>
                      </Flex>
                    
                      <InputGroup width="90%" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <GiPadlock color="#6A7DFF" />
                        </InputLeftElement>
                        <Input
                            fontWeight="medium"
                            name="name"
                            type="text"
                            placeholder="Confirmação de senha"
                        >
                        </Input>
                      </InputGroup>  

                    </Flex>      

                    
                </Flex>   

            </Flex> */}
          </Flex>
    </Flex>
  );
}