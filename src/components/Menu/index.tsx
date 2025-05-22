
import { useState, useEffect, useRef } from 'react'
import { DropdownMenuwrapper } from './styles'
import { Button, ModalConfirm } from '@/components'

interface menuItem {
    icon?: React.ReactNode
    buttonText?: string,
    isDialog?: boolean,
    modalContent?: string,
    modalTitle?: string,
    func?: Function | undefined
}

interface dropdownMenuProps {
    title?: React.ReactNode,
    list?: menuItem[]
}

export default function DropDownMenu({ title, list }: dropdownMenuProps) {
    const [open, setOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const menu = menuRef.current as HTMLDivElement
    useEffect(() => {
        const handler = (e: any) => {
            if (!menu?.contains(e?.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }

    }, [])



    return (
        <DropdownMenuwrapper>
            <div className="dropdown-inner" ref={menuRef} >

                <div className='dropdown-inner--header' onClick={() => setOpen(true)}>
                    {title}
                </div>

                <div className={`dropdown-inner--body ${open ? "active" : "inactive"}`}>
                    <ul >
                        {
                            list?.map((item: menuItem, index: number) => {

                                return <li key={index}>
                                    {
                                        !item.isDialog ?
                                            <Button type="button" onClick={item?.func as any}>{item.icon}<div className="text">{item.buttonText}</div></Button>
                                            :
                                            <ModalConfirm
                                                buttonIcon={item.icon}
                                                buttonText={item.buttonText}
                                                modalContent={item.modalContent}
                                                modalTitle={item.modalTitle}
                                                func={item.func}
                                            />

                                    }
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </DropdownMenuwrapper >
    );
}