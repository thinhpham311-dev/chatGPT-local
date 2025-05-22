import tw, { styled, css } from 'twin.macro'

interface ButtonProps {
    $variant?: 'system' | 'dark' | 'light'
    $outline?: 'system' | 'dark' | 'light'
    $isSmall?: boolean,
    $isFull?: boolean
}

const Button = styled.button<ButtonProps>(({ $variant, $isSmall, $outline, $isFull }) => [
    // The common button styles added with the tw import
    tw` px-8 py-2 transition-all relative rounded-full duration-500 hover:opacity-70 disabled:opacity-70 disabled:hover:opacity-70 flex items-center gap-x-3`,

    // Use props to conditionally style your components
    $variant === 'system' && tw`!bg-cyan-700 text-white  border-[0.5px]  border-cyan-700`,

    $variant === 'dark' && tw`!bg-black text-white  border-[0.5px]  border-black `,

    $variant === 'light' && tw`!bg-white text-black  border-[0.5px]  border-white `,

    // Combine regular css with tailwind classes within backticks
    $outline === 'system' && tw`bg-transparent text-cyan-700 border-cyan-700  border-[0.5px]   hover:(bg-cyan-700 text-white)`,

    $outline === 'dark' && tw`bg-transparent text-black border-black  border-[0.5px]   hover:(bg-black text-white)`,

    $outline === 'light' && tw`bg-transparent text-white border-white  border-[0.5px]  hover:(bg-white text-black)`,

    // Conditional props can be used
    $isSmall && tw`text-sm p-2 `,

    $isFull && tw`w-full`,

    css`div.text{
        ${tw`text-left inline-grid `}
    }
        span.text{
            ${tw`text-center block mx-auto`}
        }
    `
])

export default Button 