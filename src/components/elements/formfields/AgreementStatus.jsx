const AgreementStatus = ({ register, isRequired }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {/* Kolom 1: Status MoU */}
        <div>
          <label className="block text-lg font-semibold mb-4">
            Status MoU {isRequired && <span className="text-red-500">*</span>}
          </label>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Tanggal TTD</label>
            <input
              placeholder="Tanggal TTD"
              {...register('MoU.signatureDate', { required: isRequired })}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Jatuh Tempo</label>
            <input
              placeholder="Jatuh Tempo"
              {...register('MoU.dueDate', { required: isRequired })}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Link Dokumen</label>
            <input
              type="text"
              {...register('MoU.documentUrl', { required: isRequired })}
              placeholder="https://..."
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Kolom 2: Status PKS */}
        <div>
          <label className="block text-lg font-semibold mb-4">
            Status PKS {isRequired && <span className="text-red-500">*</span>}
          </label>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Tanggal TTD</label>
            <input
              placeholder="Tanggal TTD"
              {...register('PkS.signatureDate', { required: isRequired })}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="w-32 font-medium">Jatuh Tempo</label>
            <input
              placeholder="Jatuh Tempo"
              {...register('PkS.dueDate', { required: isRequired })}
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Link Dokumen</label>
            <input
              type="text"
              {...register('PkS.documentUrl', { required: isRequired })}
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
