import tw, { styled, css, theme } from 'twin.macro'

interface sidebarProps {
    $isShow?: boolean
}

const SidebarWrapper = styled.div<sidebarProps>(({ $isShow }) => [
    tw`h-full bg-black text-white flex flex-col justify-between shadow-lg shadow-indigo-500/40 z-10`,
    !$isShow ? tw`xl:w-[300px] w-[300px]` : tw`xl:w-[50px] w-0`,
    css`
        .header-sidebar, .conversation-item{
            ${tw` flex items-center flex-wrap justify-center`}
            ${!$isShow ? tw`h-[60px]` : tw`h-[auto]`}
            &--logo, &--title{
                ${tw`flex gap-x-3 items-center`}
                ${!$isShow ? tw`w-[calc(100%-50px)]  justify-start` : tw`h-[auto] justify-center`}
                .tooltiptext{
                    ${tw`font-bold`}
                }
            }
            &--title{
                .tooltiptext{
                    ${tw`line-clamp-1`}
                }
            }
            &--logo{
                ${tw` py-2 flex-1 cursor-pointer`}
                ${!$isShow ? tw`w-[auto] px-2` : tw`w-full`}
            }
            &--control, &--setting{
                ${tw`relative h-[45px] w-[45px] xl:flex items-center justify-center`}
                ${!$isShow ? tw`flex` : tw`hidden`}
            }
           
          
            &:not(.conversation-item){
                ${tw`border-b-[0.5px] border-white shadow-lg`}
            }
            &--input{
                ${tw`flex items-center gap-x-2 w-full`}
                input{
                    ${tw`text-black w-5/6`}
                }
                button{
                    ${tw`w-1/6`}
                }
            }
        }

        
        .footer-sidebar{
            ${tw`border-t-[0.5px] border-white `}
            &-profile{
                ${tw`flex items-center bg-white h-[50px]`}
                &--avatar{
                    ${tw`h-full relative p-2`}
                    img{
                        ${tw`h-[35px] w-[auto] object-cover rounded-full`}
                    }
                }
                &--info{
                    ${tw` flex-col text-black`}
                    ${!$isShow ? tw`flex` : tw`hidden`}
                }
            }
        }
        button{
            ${!$isShow ? tw`justify-start` : tw`justify-center`}
        }
        .tooltiptext{
            ${$isShow && tw`hidden`}
        }
    `
])

export { SidebarWrapper }