import tw, { styled, css, theme } from 'twin.macro'

interface InputProps {
    $variant?: 'system' | 'dark' | 'light'
    $outline?: 'system' | 'dark' | 'light'
    $isSmall?: boolean,
    $isFull?: boolean
}

const Input = styled.input<InputProps>(({ $variant, $isSmall, $outline, $isFull }) => [
    // The common button styles added with the tw import
    tw` px-8 py-2 transition-all duration-500 hover:opacity-70 rounded-full outline-none disabled:opacity-50  focus:border-cyan-700`,

    // Use props to conditionally style your components
    $variant === 'system' && tw`!bg-cyan-700 text-white  border-[0.5px]  border-cyan-700`,

    $variant === 'dark' && tw`!bg-black text-white  border-[0.5px]  border-black `,

    $variant === 'light' && tw`!bg-white text-black  border-[0.5px]  border-white `,

    $outline === 'system' && tw`bg-transparent text-cyan-700 border-cyan-700  border-[0.5px]  `,

    $outline === 'dark' && tw`bg-transparent text-black border-black  border-[0.5px]  `,

    $outline === 'light' && tw`bg-transparent text-white border-white  border-[0.5px]  `,

    // Conditional props can be used
    $isSmall && tw`text-sm p-2`,

    $isFull && tw`w-full`

])

const Textarea = styled.textarea<InputProps>(({ $variant, $isSmall, $outline, $isFull }) => [
    // The common button styles added with the tw import
    tw` px-10 py-2 transition-all duration-500 hover:opacity-70 rounded-full outline-none disabled:opacity-50  focus:border-cyan-700`,

    // Use props to conditionally style your components
    $variant === 'system' && tw`!bg-cyan-700 text-white  border-[0.5px]  border-cyan-700`,

    $variant === 'dark' && tw`!bg-black text-white  border-[0.5px]  border-black `,

    $variant === 'light' && tw`!bg-white text-black  border-[0.5px]  border-white `,

    $outline === 'system' && tw`bg-transparent text-cyan-700 border-cyan-700  border-[0.5px]  `,

    $outline === 'dark' && tw`bg-transparent text-black border-black  border-[0.5px]  `,

    $outline === 'light' && tw`bg-transparent text-white border-white  border-[0.5px]  `,

    // Conditional props can be used
    $isSmall && tw`text-sm p-2`,

    $isFull && tw`w-full`
])

export { Input, Textarea } 