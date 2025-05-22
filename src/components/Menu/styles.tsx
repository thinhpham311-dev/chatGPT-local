import tw, { styled, css, theme } from 'twin.macro'

const DropdownMenuwrapper = styled.div(() => [
    tw`p-0 w-full h-full `,
    css`
        .dropdown-inner{
            ${tw`relative w-full h-full`}
            &--header{
                ${tw`p-0 h-full w-full flex justify-center items-center z-10 relative cursor-pointer`}
            }
            &--body{
                ${tw`absolute right-[20%] top-[20%] bg-white text-black  z-50 transition-all shadow-lg shadow-slate-500/40 duration-500 ease-in-out`}
                button{
                    ${tw`px-3`}
                }
                &.active{
                    ${tw` visible translate-y-0 opacity-100`}
                }
                &.inactive{
                    ${tw` invisible translate-y-[-20px] opacity-0`}
                }
            }
        }
    `
])

export { DropdownMenuwrapper }