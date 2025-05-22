import tw, { styled, css, theme } from 'twin.macro'

const HeaderWrapper = styled.div(() => [
    tw`w-full h-[60px] border-b-[0.5px] border-black flex items-center xl:justify-start justify-end`,
])

export { HeaderWrapper }