import tw, { styled, css, theme } from 'twin.macro'

const CardWrapper = styled.div(() => [
    tw`rounded-lg shadow-lg shadow-slate-500/40 bg-white z-0`,
    css`
        .card-inner{
            ${tw`px-2 flex gap-x-1`}
            &--image{
                ${tw`relative w-[50px] h-[50px] pt-2`}
                &-user{
                    ${tw`rounded-full w-[50px] h-[50px] `}
                }
                &-bot{
                    ${tw`flex items-center justify-center rounded-full border-[0.5px] border-black bg-black text-white h-[50px] w-[50px]`}
                }
            }
            &--content{
                ${tw`p-2 w-[calc(100%-50px)] relative`}
                &--title{
                    ${tw`font-bold`}
                }
                &--timeline{
                    ${tw`font-thin`}
                }
                &--message{
                    ${tw`text-sm my-1`}
                }
            }
        }
    `
])

export { CardWrapper }