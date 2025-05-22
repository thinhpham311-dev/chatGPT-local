import tw, { styled, css, theme } from 'twin.macro'

const FooterWrapper = styled.div(() => [
    tw`w-full  min-h-[60px] h-[auto] flex flex-col justify-center py-2`,
    css`
        .footer-inner{
            ${tw`flex items-center justify-center gap-x-2 xl:w-1/2 w-full mx-auto px-2`}
            &--btn{
                ${tw`h-[40px] w-[40px] flex items-center justify-center relative`}
            }
        }
    `
])

export { FooterWrapper }