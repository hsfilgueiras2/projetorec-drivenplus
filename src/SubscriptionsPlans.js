import { useParams } from 'react-router-dom';

export default function SubscriptionsPlans(){
    const { idPlano } = useParams();
    return(
        <>
        <h1>
            {idPlano}
        </h1>
        </>
    )
}