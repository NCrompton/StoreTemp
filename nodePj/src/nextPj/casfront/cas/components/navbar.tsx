//import style from '../styles/Navbar.module.css'
import { Button, Slider, AppShell, Header, Navbar, Group, ActionIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconAlbum, IconDatabase, IconMan, Icon3dRotate, IconLineDashed, IconSun, IconMoon } from '@tabler/icons'
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function Navbars({controller} : {[key:string]:any}){
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [active, setActive] = useState(false);
    const dark = colorScheme === 'dark';
    const theme = useMantineTheme();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        console.log(scrollY)
        handleScroll();

            window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
       // <div className="flex w-screen h-screen bg-slate-300">
            <div className="flex bg-slate-700">  
                <Navbar className='' width={active?{ base: 50 }:{ base: 200 }} p="md" styles={(theme) => ({
                    backgroundColor: dark? theme.colors.dark[7]: theme.colors.light[0],
                    colorScheme: colorScheme
                })}>
                    <Navbar.Section >
                        <Header height={70} className="pl-2 pr-5 transition">
                        <Group className=' border-zinc-300'>
                            {/* <Icon3dRotate size={20} color="green" className="m-5 scale-3x rounded-md border border-slate-300 transition duration-500 hover:scale-100"/>*/}
                             <a href='/'><Icon3dRotate size={60} color="green" className="rounded-md border-slate-300 cursor-pointer"/></a>
                             <span className="tracking-wider text-[30px] mt-2">CAS</span>
                            <ActionIcon variant="outline"
                                color={dark ? 'yellow' : 'blue'}
                                onClick={() => toggleColorScheme()}
                                title={dark? "Turn off Dark mode": "Turn on Dark mode"}
                                className="ml-auto"
                                >
                            {dark ? <IconSun textAnchor='Toggle dark mode' /> : <IconMoon /> }
                            </ActionIcon>
                        </Group>
                        </Header>
                    </Navbar.Section>
                    <IconLineDashed size={active? 20:25} className="ml-auto border border-slate-300 rounded-md hover:border-slate-500 active:bg-slate-500" onClick={() => {setActive(!active)}}/>
                    <Navbar.Section mt='xs' className='cursor-pointer'>
                        <NavItem image={<IconAlbum size={20} />} name="Course" active={active}/>
                    </Navbar.Section>
                    <Navbar.Section ><NavItem image={<IconDatabase size={20} />} name="Course Detail" active={active}/></Navbar.Section>
                    <Navbar.Section ><NavItem image={<IconMan size={20} />} name="Staff" active={active}/></Navbar.Section>
                </Navbar>
            </div>
           /*  <div>
                {children}
            </div>
        </div> */
    )
} 

function NavItem({image, name, active} : {[key:string]:any}){
    const link:string = name; 
    return(
        <Link href={'/' + link.toLowerCase().replace('\ ', '')}>
            <Group className="rounded-md hover:bg-light-200 py-4" >
                {image}
                <div className="" style={active?{display:'none'}: {}}>
                    {name}
                </div>
            </Group>
        </Link>
    )
}