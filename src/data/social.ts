import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaTiktok, FaTwitch, FaYoutube } from "react-icons/fa";


import type { DevTreeLink } from "../types";

export const social: DevTreeLink[] = [
    { name: 'facebook', url: '', enabled: false, icon: FaFacebook },
    { name: 'github', url: '', enabled: false, icon: FaGithub },
    { name: 'instagram', url: '', enabled: false, icon: FaInstagram },
    { name: 'x', url: '', enabled: false, icon: FaTwitter },
    { name: 'youtube', url: '', enabled: false, icon: FaYoutube },
    { name: 'tiktok', url: '', enabled: false, icon: FaTiktok },
    { name: 'twitch', url: '', enabled: false, icon: FaTwitch },
    { name: 'linkedin', url: '', enabled: false, icon: FaLinkedin },
]