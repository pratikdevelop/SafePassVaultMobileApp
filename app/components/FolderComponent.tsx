import axiosConfig from '@/axios-config'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import folderService from '../services/folderService'

const FolderComponent = ({
    type
}: {
    type: string
}) => {
    const [folders, setFolders] = useState<any[]| undefined>([]);
    useEffect(()=>{
        const getFolderByType = async(type: string) => {
            try {
                const response = await folderService.getFoldersByType(type);
                setFolders(response);
            } catch (error: any) {
                console.error('error For fetching the folders', error.message); 
                // handle the error
                setFolders([]);
            }
        }
        getFolderByType(type)

    },
    [type]
)
  return (
    <View>

      
    </View>
  )
}

export default FolderComponent
