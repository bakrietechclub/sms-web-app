const AgreementStatus = ({ register }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {/* Kolom 1: Status MoU */}
        <div>
          <label className="block text-lg font-semibold mb-4">Status MoU</label>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Tanggal TTD</label>
            <input
              placeholder="Tanggal TTD"
              {...register('MoU.signatureDate')}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Jatuh Tempo</label>
            <input
              placeholder="Jatuh Tempo"
              {...register('MoU.dueDate')}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Link Dokumen</label>
            <input
              type="text"
              {...register('MoU.documentUrl')}
              placeholder="https://..."
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Kolom 2: Status PKS */}
        <div>
          <label className="block text-lg font-semibold mb-4">Status PKS</label>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Tanggal TTD</label>
            <input
              placeholder="Tanggal TTD"
              {...register('PkS.signatureDate')}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Jatuh Tempo</label>
            <input
              placeholder="Jatuh Tempo"
              {...register('PkS.dueDate')}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Link Dokumen</label>
            <input
              type="text"
              {...register('PkS.documentUrl')}
              placeholder="https://..."
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementStatus;
