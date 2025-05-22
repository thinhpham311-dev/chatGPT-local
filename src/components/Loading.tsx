import tw, { styled, css, theme } from 'twin.macro'

interface InputProps {
    $variant?: 'dark' | 'light' | 'transparent'
    $isFill?: boolean
}

const LoadingWrapper = styled.div<InputProps>(({ $isFill, $variant }) => [
    tw`w-full h-full absolute left-0 top-0 flex items-center justify-center gap-x-3 z-[99999] `,
    $isFill && tw`fixed top-0 left-0`,
    $variant === "dark" && tw`text-white bg-black`,
    $variant === "light" && tw`text-black bg-white`,
    $variant === "transparent" && tw` bg-transparent`,
    css`
    span{
        ${tw`text-lg  font-bold`}
    }
    svg{
        ${tw`animate-spin`}
        path{
            ${$variant === "dark" && tw`stroke-white`}
            ${$variant === "light" && tw`stroke-black`}
            ${$variant === "transparent" && tw`stroke-white`}
        }
    }
    `
])
const IconLoading = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 48 48"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 4v4m10-1.32l-2 3.464M41.32 14l-3.464 2M44 24h-4m1.32 10l-3.464-2M34 41.32l-2-3.464M24 44v-4m-10 1.32l2-3.464M6.68 34l3.464-2M4 24h4M6.68 14l3.464 2M14 6.68l2 3.464"></path></svg>
    )
}

const Loading = ({ ...config }: any) => (
    <LoadingWrapper $isFill={config.isfill} $variant={config.color}>
        <IconLoading />{!config.isIcon && <span>Loading...</span>}
    </LoadingWrapper>
)


export default Loading 