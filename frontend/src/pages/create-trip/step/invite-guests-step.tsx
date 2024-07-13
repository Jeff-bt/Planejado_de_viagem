import { UserRoundPlus, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";

interface IInviteGuestsStepProps {
    openGuestsModals: () => void;
    openConfirmTripModal: () => void;
}

export function InviteGuestsStep({openConfirmTripModal, openGuestsModals}:IInviteGuestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type='button' onClick={openGuestsModals} className='flex items-center gap-2 flex-1 text-left'>
              <UserRoundPlus className='size-5 text-zinc-400'/>
              <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
            </button>

            <div className='w-px h-6 bg-zinc-800'/>

            <Button  onClick={openConfirmTripModal} variant="primary" size="default">
              Confirmar viagem
              <ArrowRight className='size-5' />
            </Button>
          </div>
    )
}