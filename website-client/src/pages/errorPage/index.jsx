import imgError from '../../assets/img/error/404.webp';

export default function ErrorPage() {
    return (
        <>
            <div className="error">
                <img src={imgError} alt="" />
            </div>
        </>
    );
}