import './descobrir.css';
import TextField from '@mui/material/TextField';

export default function Descobrir() {

    return(
        <div className='conteudo'>
            <h1>Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis</h1>
            <br />
            <TextField
                id="outlined"
                label="Buscar tags"
            />

            <div>
                {/* Estático */}
                <div className='card'>
                    <img src="src/assets/card1.png" alt=""/>
                    <span>
                        <img src="src/assets/Bianca.png" className='user' alt="" />
                        <p>Bianca Martin • 02/24</p>
                    </span>
                </div>
                <div className='card'>
                    <img src="src/assets/card2.png" alt=""/>
                    <span>
                        <img src="src/assets/Enzo.png" className='user' alt="" />
                        <p>Enzo Gabriel • 12/23</p>
                    </span>
                </div>
                <div className='card'>
                    <img src="src/assets/card3.png" alt=""/>
                    <span>
                        <img src="src/assets/Alice.png" className='user' alt="" />
                        <p>Alice Alexandra • 12/23</p>
                    </span>
                </div>
                <div className='card'>
                    <img src="src/assets/card4.png" alt=""/>
                    <span>
                        <img src="src/assets/Carolina.png" className='user' alt="" />
                        <p>Carolina Valentim • 12/23</p>
                    </span>
                </div>
            </div>

        </div>
    )
}