interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, title, onConfirm, onCancel }: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}