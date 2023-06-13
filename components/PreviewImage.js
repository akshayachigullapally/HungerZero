export function PreviewImage({ url }) {
   
    return (
        <div style={{
            height:'150px',
            width: '330px',
            backgroundColor: 'rgb(22, 255, 153,1)',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            position: 'relative',
            objectFit: 'cover',
            marginLeft: '.3rem'
        }}>
            {url && (
                <img
                src={url}
                alt="image"
                className="w-full h-full absolute top-0"
                />
            )}
        </div>
    )
}