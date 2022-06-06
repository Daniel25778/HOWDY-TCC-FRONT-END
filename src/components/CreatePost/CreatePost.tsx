import { Button, Flex, Image, Input, Select, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { getUserLogged } from '../../functions/getUserLogged';
import { api as apiFunction } from '../../services/api';

interface CreatePostProps {
    modalShareDisplay?: any;
    setModalShareDisplay?: any;
}

export default function CreatePost({ modalShareDisplay, setModalShareDisplay }: CreatePostProps) {
    const postImageRef = useRef(null);

    const [userLogged, setUserLogged] = useState<any>(null);
    const [attachedPostImage, setAttachedPostImage] = useState<boolean>(false);
    const [category, setCategory] = useState<any>('popular');

    const [categoryList, setCategoryList] = useState<any[]>([]);
    const router = useRouter();

    const toast = useToast();

    const api = apiFunction();

    useEffect(() => {
        if (!router.isFallback) {
            getUserLogged(api).then((res) => {
                setUserLogged(res);
            });

            //Pegar categorias das postagens
            api.get(`postCategories`)
                .then((response) => {
                    setCategoryList(response.data);
                })
                .catch((err) => console.log('err category list'));
        }
    }, [category, router.isFallback]);

    function uploadImage() {
        setAttachedPostImage(false);

        const file = postImageRef.current.files[0];
        const fileReader = new FileReader();

        if (file) {
            fileReader.readAsDataURL(file);
        }

        fileReader.onloadend = () => {
            setAttachedPostImage(true);
        };
    }

    function sendPost(e) {
        e.preventDefault();
        //@ts-ignore
        const inputDescriptionPost = document.getElementById('descriptionPost-input')?.value;

        //@ts-ignore
        const selectCategoryPost = document.getElementById('categoryPost-select')?.value;

        //@ts-ignore
        const selectVisibility = document.getElementById('visibility-select')?.value;
        console.log(inputDescriptionPost, selectCategoryPost, selectVisibility);
        const formData = new FormData();

        if (postImageRef.current.files.length === 1 && attachedPostImage !== false)
            formData.append('imageContent', postImageRef.current.files[0]);
        formData.append('textContent', inputDescriptionPost);
        console.log(selectCategoryPost);
        switch (selectCategoryPost) {
            case 'Esportes':
                formData.append('idPostCategory', '1');
                break;
            case 'Notícias':
                formData.append('idPostCategory', '2');
                break;
            case 'Jogos':
                formData.append('idPostCategory', '3');
                break;
            case 'Filmes':
                formData.append('idPostCategory', '4');
                break;
            case 'Moda':
                formData.append('idPostCategory', '5');
                break;
            case 'Dúvidas':
                formData.append('idPostCategory', '6');
                break;
        }
        formData.append('isPublic', selectVisibility);

        api.post(`posts`, formData)
            .then((response) => {
                toast({
                    title: 'POSTAGEM ENVIADA COM SUCESSO!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                });
            })
            .catch((error) => {
                switch (error.response.data.error) {
                    case 'The text is not written according to the language you want to learn':
                        toast({
                            title: 'A DESCRIÇÃO DA POSTAGEM DEVE SER ESCRITA NA SUA LÍNGUA DE INTERESSE',
                            status: 'error',
                            isClosable: true,
                            position: 'top',
                        });
                        break;

                    default:
                        toast({
                            title: 'OCORREU UM ERRO NA POSTAGEM',
                            status: 'error',
                            isClosable: true,
                            position: 'top',
                        });
                        break;
                }
            });
    }

    return (
        <>
            <Flex width="100%" align="center" flexDir="column">
                <Flex boxShadow={'md'} flexDir="column" bgColor="#FFFF" p="1%" width="60%" borderRadius="20" h="12rem">
                    <Flex mb="3%" align="center" gap="2%" width="100%">
                        <Image
                            borderRadius="100%"
                            h="4rem"
                            w="4rem"
                            objectFit="cover"
                            src={
                                userLogged?.profilePhoto
                                    ? userLogged?.profilePhoto
                                    : '/images/default-images/default-profile-photo.svg'
                            }
                            alt="profilePhoto"
                        ></Image>
                        <Input
                            width="100%"
                            variant="filled"
                            type="text"
                            fontSize={['x-small', 'medium', 'x-large']}
                            placeholder="Write in English about whatever you want!"
                            borderRadius="100"
                            id="descriptionPost-input"
                            value="Hi everyone, I just discovered this site and I want to start venturing out, what's the first step?"
                        />
                    </Flex>

                    <Flex w="100%" gap="1%">
                        <Input type="file" display="none" ref={postImageRef} onChange={uploadImage} />

                        <Select
                            id="categoryPost-select"
                            fontWeight="medium"
                            fontSize={['medium', 'large', 'x-large']}
                            variant="filled"
                            placeholder="Categoria"
                        >
                            {categoryList.length > 0 &&
                                categoryList.map((category) => <option>{category.categoryName}</option>)}
                        </Select>

                        <Select
                            id="visibility-select"
                            fontWeight="medium"
                            fontSize={['medium', 'large', 'x-large']}
                            variant="filled"
                            placeholder="Visibilidade"
                        >
                            <option value="true">Público</option>
                            <option value="false">Somente amigos</option>
                        </Select>

                        <Button
                            onClick={() => {
                                console.log(`Teste`);
                                postImageRef.current.click();
                            }}
                        >
                            {<BsCamera color="#2EC4F3" size="5rem" />}
                        </Button>

                        <Button
                            fontSize={['medium', 'large', 'x-large']}
                            bgColor="howdyColors.mainBlue"
                            textColor={'howdyColors.mainWhite'}
                            w="100%"
                            onClick={sendPost}
                        >
                            Postar
                        </Button>
                    </Flex>
                </Flex>
                {/* we are young */}
            </Flex>
        </>
    );
}
