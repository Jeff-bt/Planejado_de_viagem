import { CircleCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { eachDayOfInterval, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IActivity {
    id: string;
    title: string;
    occursAt: string;
}

interface IDate {
    endsAt: string;
    startsAt: string;
}

export function Actitivities () {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [data, setData] = useState<IDate | undefined>();
    
    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data));
    }, [tripId]);

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setData((response.data)));
    }, []);

    const dates = useMemo(() => {
        if (!data) return;
        return eachDayOfInterval({start: data?.startsAt, end: data?.endsAt,})
        
    }, [data]);

    
    
    
    return (
        <div className="space-y-8">
        
            {dates?.map((date) => {
                return (
                    <div key={date.getDay()} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">{format(date, 'd')}</span>
                            <span className="text-xs text-zinc-500">{format(date, 'EEEE', {locale: ptBR})}</span>
                        </div>
                        {activities.filter(activity => format(activity.occursAt, 'd') === format(date, 'd')).length > 0 ? (
                            activities.filter(activity => format(activity.occursAt, 'd') === format(date, 'd')).map(activity => {
                                return (
                                    <div>
                                        {activities.length > 0 && (
                                                <div>
                                                    <div key={activity.id} className="space-y-2.5">
                                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                            <CircleCheck className="size-5 text-lime-300"/>
                                                            <span className="text-zinc-100">{activity.title}</span>
                                                            <span className="text-zinc-400 text-sm ml-auto">{format(activity.occursAt, 'HH:mm')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                )
                            })
                        ) : (
                            <p>Nenhuma atividade cadastrada nessa data.</p>
                        )}
                    </div>
                );
            })}
                
    </div>
    )
}