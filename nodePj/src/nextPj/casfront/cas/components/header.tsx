import {Group, ActionIcon, Header} from '@mantine/core'
import {Icon3dRotate, IconLineDashed} from '@tabler/icons'

export default function Headers(){
    return (
        <Header height={70}>
            <Group className='border-b pb-1 border-zinc-300'>
                <Icon3dRotate size={20} color="green" className="m-5 scale-3x rounded-md border border-slate-300 transition duration-500 hover:scale-100"/>
                    
                <IconLineDashed className="ml-auto border border-slate-300 rounded-md hover:border-slate-500 active:bg-slate-500" onClick={() => {}}/>
            </Group>
        </Header>
    )
}