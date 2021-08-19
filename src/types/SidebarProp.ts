import { SvgIconComponent } from "@material-ui/icons";

interface SidebarProp{
    title: string;
    path: string;
    icon: {
        name: SvgIconComponent;
        htmlColor: string;
        color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
        size?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
    }
}

export default SidebarProp;