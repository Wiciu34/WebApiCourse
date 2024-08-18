import "./Card.css"

type Props = {}

const Card = (props: Props) => {
  return (
     <div className="card">
        <img src="https://pobierak.jeja.pl/images/4/a/5/181296_to-uczucie-kiedy-twoje-obrazki-i.jpg" alt='Image' />
        <div className='details'>
            <h2>AAPL</h2>
            <p>$100</p>
        </div>
        <p className='info'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, laboriosam?
        </p>
     </div>
  );
}

export default Card