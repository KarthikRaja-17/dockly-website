import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { siteConfig } from '../config';
import { useGetConfigQuery, useSaveConfigMutation } from '@/store/apiSlice';
import { setIsAdmin, setIsLoginModalOpen, logout as logoutAction } from '@/store/authSlice';
import { RootState } from '@/store';
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import DocklyLoader from '../dockly-loader';

interface AdminContextType {
    isAdmin: boolean;
    isLoginModalOpen: boolean;
    config: typeof siteConfig;
    setIsAdmin: (value: boolean) => void;
    setIsLoginModalOpen: (value: boolean) => void;
    updateConfig: (path: string, value: any) => void;
    saveConfigToServer: () => Promise<void>;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const emptySiteConfig = {
    siteName: '',
    logo: {
        src: '',
        alt: '',
    },
    header: {
        menus: [],
        buttons: {
            waitlist: '',
        },
    },
    hero: {
        title: '',
        cycleWords: [],
        subtitle: '',
        emailPlaceholder: '',
        waitlistButton: '',
        features: [],
    },
    features: {
        title: '',
        subtitle: '',
        items: [],
    },
    video: {
        title: '',
        subtitle: '',
        youtubeId: '',
        thumbnailText: '',
        thumbnailImage: '',
    },
    hubs: {
        title: '',
        subtitle: '',
        items: [],
    },
    boards: {
        title: '',
        subtitle: '',
        items: [],
    },
    security: {
        title: '',
        subtitle: '',
        features: [],
    },
    pricing: {
        title: '',
        subtitle: '',
        guaranteeText: '',
        subtext: '',
        plans: [],
        taxNote: '',
        features: [],
    },
    cta: {
        title: '',
        subtitle: '',
        steps: [],
        buttons: {
            primary: '',
            secondary: '',
        },
    },
    faqs: {
        title: "Frequently Asked Questions",
        subtitle: "Get instant answers to common questions...",
        items: [
            {
                question: "What is Dockly and how does it work?",
                answer: "Dockly is an all-in-one workspace..."
            }
        ]
    },
    footer: {
        description: '',
        links: {
            Product: [],
            Company: [],
            Support: [],
        },
        copyright: '',
        socialLinks: {
            twitter: '',
            facebook: '',
            pinterest: '',
        },
    },
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const { isAdmin, isLoginModalOpen } = useSelector((state: RootState) => state.auth);
    const [config, setConfig] = useState<typeof siteConfig>(emptySiteConfig);

    const { data: configData, isLoading, error } = useGetConfigQuery();
    const [saveConfigMutation] = useSaveConfigMutation();

    useEffect(() => {
        if (configData && configData.payload) {
            setConfig(configData.payload.config);
        }
        else if (!configData?.payload.config) {
            setConfig(siteConfig);
        }
    }, [configData]);

    const saveConfigToServer = async () => {
        try {
            await saveConfigMutation({ config }).unwrap();
            console.log('Config saved successfully');
        } catch (error) {
            console.error('Error saving config:', error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'A') {
                event.preventDefault();
                if (!isAdmin) {
                    dispatch(setIsLoginModalOpen(true));
                } else {
                    dispatch(setIsAdmin(false));
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAdmin, dispatch]);

    const updateConfig = async (path: string, value: any) => {
        setConfig(prevConfig => {
            const newConfig = JSON.parse(JSON.stringify(prevConfig)); // Deep clone to avoid readonly issues
            const keys = path.split('.');
            let current: any = newConfig;

            for (let i = 0; i < keys.length - 1; i++) {
                if (current[keys[i]] === undefined) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;

            // Auto-save to server after updating config
            setTimeout(async () => {
                try {
                    await saveConfigMutation({ config: newConfig }).unwrap();
                    console.log('Config auto-saved successfully');
                } catch (error) {
                    console.error('Error auto-saving config:', error);
                }
            }, 500);

            return newConfig;
        });
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    const handleSetIsAdmin = (value: boolean) => {
        dispatch(setIsAdmin(value));
    };

    const handleSetIsLoginModalOpen = (value: boolean) => {
        dispatch(setIsLoginModalOpen(value));
    };

    if (isLoading) {
        return <DocklyLoader loading={isLoading} />;
    }

    return (
        <AdminContext.Provider value={{
            isAdmin,
            isLoginModalOpen,
            config,
            setIsAdmin: handleSetIsAdmin,
            setIsLoginModalOpen: handleSetIsLoginModalOpen,
            updateConfig,
            saveConfigToServer,
            logout
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};