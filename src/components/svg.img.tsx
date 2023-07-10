const enum MetaData {
    version = "5.6.6",
    hash = "26783c9",
    updateTime = "2022-10-22T10:52:25+08:00",
    akariOdangoLoading = "./svg/akari-odango-loading.svg",
    akariHideWall = "./svg/akari-hide-wall.svg",
    akariNotFound = "./svg/akari-not-found.svg",
}

export const AkariHideWall: React.FC = () => {
    return (
        <img className="akari-hide-wall" alt="akari-hide-wall" src={MetaData.akariHideWall} crossOrigin="anonymous" />
    );
};

export const AkariNotFound: React.FC = () => {
    return <img className="akari-not-found" alt="not found" src={MetaData.akariNotFound} crossOrigin="anonymous" />;
};

export const AkariOangoLoading: React.FC = () => {
    return (
        <img
            className="akari-odango-loading start-loading"
            alt="loading"
            src={MetaData.akariOdangoLoading}
            crossOrigin="anonymous"
        />
    );
};
