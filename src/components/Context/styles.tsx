import tw, { styled, css, theme } from 'twin.macro'

interface contextProps {
    $isShow?: boolean
}

const ContextWrapper = styled.div<contextProps>(({ $isShow }) => [
    tw`h-full flex flex-col justify-between xl:relative absolute z-0`,
    !$isShow ? tw`xl:w-[calc(100%-300px)] lg:w-full w-full` : tw`xl:w-[calc(100%-50px)] lg:w-full w-full`,
])

export { ContextWrapper }