

const Die = ({value,style,hold}) => {
  return (
    <button 
       onClick={hold}  
       style={style} 
       className='die'
    >
        {value}
    </button >

  )
}

export default Die