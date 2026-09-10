import { ReactNode } from 'react';
interface SectionProps{children:ReactNode;className?:string;id?:string}
export function Section({children,className='',id}:SectionProps){return <section id={id} className={'section-padding relative '+className}>{children}</section>}
interface SectionHeaderProps{title:string;subtitle?:string;centered?:boolean;className?:string}
export function SectionHeader({title,subtitle,centered=false,className=''}:SectionHeaderProps){return <header className={(centered?'text-center mx-auto ':'')+'mb-12 md:mb-16 max-w-3xl '+className}><p className="eyebrow mb-4">{title}</p>{subtitle&&<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.12] tracking-[-.035em] text-balance">{subtitle}</h2>}</header>}
interface ContainerProps{children:ReactNode;className?:string;size?:'sm'|'md'|'lg'|'xl'|'full'}
export function Container({children,className='',size='lg'}:ContainerProps){const sizes={sm:'max-w-3xl',md:'max-w-5xl',lg:'max-w-6xl',xl:'max-w-7xl',full:'max-w-full'};return <div className={'mx-auto w-full px-5 sm:px-8 lg:px-10 '+sizes[size]+' '+className}>{children}</div>}
