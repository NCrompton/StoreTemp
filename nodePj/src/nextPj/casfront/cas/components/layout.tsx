import { AppShell } from '@mantine/core'
import Navbars from './navbar'
import Header from './header'

export default function Layout({ children }: {[key:string]:any}){
    return (
        <AppShell
            navbar={<Navbars />}
            >
            {children}
        </AppShell>
    )
}