import tw, { styled, css, theme } from 'twin.macro'

const ConversationWrapper = styled.div(() => [
    tw`flex-1 overflow-y-auto overflow-x-hidden`,
    css`
        ul{
        ${tw`relative h-full w-full`}
            li{
                ${tw`flex items-center justify-center`}
                &.focused{
                    ${tw`bg-cyan-700`}
                }
            }
        }`

])

export { ConversationWrapper }