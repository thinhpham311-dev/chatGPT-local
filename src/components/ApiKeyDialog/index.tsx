'use client'

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Button from '../Button'
import { Input } from '../Input'
import { FormInputApiKey } from "./styles"

type ApiKeyDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSave: (apiKey: string) => void
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ isOpen, onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isOpen) {
            setApiKey('')
            setError('')
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!apiKey.trim()) {
            setError('API key không được để trống')
            return
        }
        setError('')
        onSave(apiKey.trim())
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Nhập API Key"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                },
                content: {
                    position: 'relative',
                    inset: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <h2 >Nhập API Key</h2>
            <FormInputApiKey onSubmit={handleSubmit}>
                <Input
                    $outline="dark"
                    $isFull
                    type="text"
                    placeholder="sk-xxxxxx..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                    $variant="dark"
                    $isSmall
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                    Hủy
                </Button>
                <Button
                    $variant='dark'
                    $isSmall
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                    Lưu
                </Button>
            </FormInputApiKey>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </Modal>
    )
}

export default ApiKeyDialog
