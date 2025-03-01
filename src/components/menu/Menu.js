"use client";

import React, { useEffect, useRef, useState } from 'react'
import './menu.css'
import Link from 'next/link';

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';

const menulinks = [
    { path: "/", label: "Home" },
    { path: "/work", label: "Work" },
    { path: "/lab", label: "Lab" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" }
]

const Menu = () => {

    const container = useRef()
    const [isMenuopen, setMenuopen] = useState(false)

    const tl = useRef();

    const toggleMenu = () => {
        setMenuopen(!isMenuopen)
    }

    useGSAP(() => {
        // Make sure menu is hidden initially
        gsap.set(".menu-overlay", {clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"});
        gsap.set(".menu-link-item-holder", {y: 75});
        
        tl.current = gsap.timeline({paused: true})
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", 
                ease: "power4.inOut"
            })
            .to(".menu-link-item-holder", {
                duration: 1, 
                y: 0, 
                stagger: 0.1, 
                ease: "power4.inOut", 
                delay: -0.75
            })
            .to(".menu-info-col", {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: "power4.out",
                duration: 0.8,
                delay: -0.5
            })
            .to(".menu-preview", {
                opacity: 1,
                y: 0,
                ease: "power4.out",
                duration: 0.8,
                delay: -0.6
            });
    }, {scope: container})

    useEffect(() => {
        if(isMenuopen){
            tl.current.play()
        }else{
            tl.current.reverse()
        }
    },[isMenuopen])

    return (
        <div className='menu-container' ref={container}>
            <div className='menu-bar' >
                <div className='menu-logo'>
                    <Link href='/'>Bannu</Link>   {/* Add Logo */}
                </div>
                <div className='menu-open' onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
            </div>
            <div className='menu-overlay'>
                <div className='menu-overlay-bar'>
                    <div className='menu-logo'>
                        <Link href='/'>Bannu</Link>   {/* Add Logo */}
                    </div>
                    <div className='menu-close' onClick={toggleMenu}>
                        <p>Close</p>
                    </div>
                </div>
                <div className='menu-close-icon' onClick={toggleMenu}> 
                    <p>&#x2715;</p>
                </div>
                <div className='menu-copy'>
                    <div className='menu-links'>
                        {menulinks.map((link,index) => (
                            <div className='menu-link-item' key={index}>
                                <div className='menu-link-item-holder' onClick={toggleMenu}>
                                    <Link href={link.path} className='menu-link'>{link.label}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='menu-info'>
                        <div className='menu-info-col'>
                            <a href='#'>X &#8599;</a>
                            <a href='#'>Instagram &#8599;</a>
                            <a href='#'>Facebook &#8599;</a>
                            <a href='#'>LinkedIn &#8599;</a>
                        </div>  
                        <div className='menu-info-col'>
                            <p>info@bannu.com</p>
                            <p>7731023599</p>
                        </div>
                    </div>
                </div>
                <div className='menu-preview'>
                    <p>Resuable Comp</p>

                </div>
            </div>
        </div>
    )
}

export default Menu