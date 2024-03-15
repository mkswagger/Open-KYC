import React, { useEffect } from 'react';

interface CrispChatProps {
    websiteId: string;
}

declare global {
    interface Window {
        $crisp: any;
        CRISP_WEBSITE_ID: string;
    }
}

const CrispChat: React.FC<CrispChatProps> = ({ websiteId }) => {
    useEffect(() => {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "fdd574d2-7cd3-4841-b41d-030f50ad3aeb";

        (function () {
            var d = document;
            var s = d.createElement("script");

            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    }, [websiteId]);

    return null;
};

export default CrispChat;
