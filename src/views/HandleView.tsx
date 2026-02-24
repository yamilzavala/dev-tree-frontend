import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api/DevTree"
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import HandleData from "../components/HandleData";
import NotFoundView from "./NotFoundView";


const HandleView = () => {
    const params = useParams()
    const handle = params.handle!

    const { data , isLoading, error } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1,
    })

    if (isLoading) return (<Loading />);

    if(error) return (<NotFoundView/>)

    if(data) return <HandleData data={data} />
}

export default HandleView