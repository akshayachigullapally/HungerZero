export function PreviewImage({ url }) {
   
    return (
        <div style={{
            height:'150px',
            width: '280px',
            backgroundColor: 'rgb(22, 255, 153,1)',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            position: 'relative',
            objectFit: 'cover',
            marginLeft: '2rem'
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