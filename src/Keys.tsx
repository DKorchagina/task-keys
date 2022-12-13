import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [mass, getMass] = useState(props.initialData);
    const [sort, getSort] = useState(props.sorting);
    const [edit, getEdit] = useState(false);
    const [id, setId] = useState(-1);
    const [isSave, setSave] = useState('');

    useEffect(()=>{
        if (props.sorting=='ASC')
        {
            getMass(mass);
            getSort(props.sorting);
        }
        else{
            getMass(mass.sort((a, b)=>b.id-a.id));
            getSort(props.sorting);
        }
    }, [props.sorting]);

    return (
        <div>
            {mass.map((item)=>{
                if (!edit||item.id != id)
                {
                    return (
                        <div key={item.id} onClick={()=>{
                            getEdit(true);
                            setId(item.id);
                        }}>{item.name}</div>
                    );
                    
                }
                else{
                    return (
                        <input key={item.id} defaultValue={item.name} type='text' onChange={function (el) {
                            setSave(el.target.value);
                        }}
                        onKeyDown={function (el){
                            if (el.key==='Escape'){
                                getEdit(false);
                            }
                            if (el.key === 'Enter'){
                                mass.map((x)=>{
                                    if (x.id == item.id){
                                        x.name = isSave;
                                    }
                                });
                                getEdit(false);
                                getMass(mass);
                            }
                        }}></input>
                    );
                }
            })}
        </div>
    );
}
