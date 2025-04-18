// ArticleDetails.tsx
import React from 'react';
//import CopyButton from './components/copyButton';
//import CitePopup from './components/citePopup';

interface ArticleDetailsProps {
  name: string;
  hash: string;
  chemClass: string;
  chemicalFormulaHtml: string;
  molecularFormulaHtml: string;
  molecularWeight: string;
  optimalConc: string;
  structureImage?: string;
  casNumber: string;
  pricingInfo?: any;
  date_written: string;
  written_by: string[];
  safetyDocumentSheet?: string;
  synonyms: string[];
  htmlText: string;
  cell_info: Array<{ cellType: string; successRate?: string; referenceURL?: string }>;
  references: Array<{ reference: string; url: string; organisation: string }>;
  gras_info?: { found: boolean; reference_url?: string };
}

interface Citation {
  apa: string;
  ama: string;
  mla: string;
  harvard: string;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({
  name,
  hash,
  chemClass,
  chemicalFormulaHtml,
  molecularFormulaHtml,
  molecularWeight,
  optimalConc,
  structureImage,
  casNumber,
  date_written,
  written_by,
  safetyDocumentSheet,
  synonyms,
  htmlText,
  cell_info,
  references,
  gras_info,
}) => {
  const authors = Array.isArray(written_by) && written_by.length > 0
    ? written_by.join(", ")
    : "Cryorepository Foundation";

  const createCitation = (data: { name: string; date_written: string; hash: string }): Citation => {
    const { name, date_written, hash } = data;
    const date = new Date(date_written);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const currentDate = new Date().toISOString().split('T')[0];

    return {
      apa: `${authors} (${formattedDate}). ${name}. Cryorepository. https://cryorepository.com/database/${hash}`,
      ama: `${authors}. ${name}. Cryorepository. Published ${formattedDate}. Accessed ${currentDate}. https://cryorepository.com/database/${hash}`,
      mla: `${authors}. "${name}." Cryorepository, ${formattedDate}, https://cryorepository.com/database/${hash}.`,
      harvard: `${authors} (${formattedDate}) '${name}', Cryorepository. Available at: https://cryorepository.com/database/${hash} (Accessed: ${currentDate})`,
    };
  };

  const citations = createCitation({ name, date_written, hash });

  return (
    <div className="pt-16">
      <div className="flex items-center gap-1 px-5 py-6 max-w-[1875px] mx-auto">
        <a href="/database" className="font-semibold">Cryoprotectant Database</a>
        <svg className="opacity-40" viewBox="0 0 24 24" width="1em" height="1em">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5l7 7l-7 7"/>
        </svg>
        <p className="font-semibold opacity-40 max-w-[340px] truncate">{name}</p>
      </div>

      <div className="grid grid-cols-[1fr,340px] max-w-[1800px] mx-auto max-[930px]:grid-cols-1">
        <div className="mx-5 mb-8">
          <div>
            <h1 className="flex items-center gap-1 flex-wrap text-3xl font-bold">
              {name}
              {chemicalFormulaHtml && (
                <span className="flex items-center gap-1 max-[450px]:hidden" 
                      dangerouslySetInnerHTML={{ __html: chemicalFormulaHtml }} />
              )}
            </h1>

            <div className="flex justify-between items-center pt-1 max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-1">
              <div className="flex items-center gap-1">
                <span className="text-base"></span>
                <h5 className="text-base">Written by {authors}</h5>
                <div className="flex items-center gap-1 px-1 py-0.5 border border-[#6638b0] rounded-2xl 
                              bg-gradient-to-r from-[#6638b0] to-[#9848a3] text-transparent bg-clip-text">
                  <span></span>
                  <span className="max-[450px]:hidden">Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/*<CitePopup citations={citations} />
                <CopyButton token={hash} />*/}
                <a href="/report" title="Report Error" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <span className="text-xl"></span>
                </a>
              </div>
            </div>

            <div className="mt-5">
              <div className="border border-gray-700 rounded min-[931px]:hidden mb-3">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: 'Class', value: chemClass },
                      { label: 'Chemical Formula', value: chemicalFormulaHtml, isHtml: true },
                      { label: 'Molecular Formula', value: molecularFormulaHtml, isHtml: true },
                      { label: 'Molecular Weight', value: molecularWeight },
                      { label: 'Optimal Conc', value: optimalConc },
                    ].map(({ label, value, isHtml }) => (
                      <tr key={label}>
                        <td className="text-gray-400 font-semibold p-2">{label}</td>
                        <td className="text-right p-2">
                          {isHtml ? <div dangerouslySetInnerHTML={{ __html: value }} /> : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {synonyms.length > 0 && synonyms.some(s => s.trim()) && (
                <div className="p-4 border border-gray-700 rounded my-3 max-w-[930px] min-[931px]:hidden">
                  <p>Synonyms</p>
                  <h6 className="text-sm text-gray-400">Also Known As</h6>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {synonyms.map((synonym, index) => (
                      <p key={index} className="px-2 py-1 border border-gray-700 rounded-2xl">{synonym}</p>
                    ))}
                  </div>
                </div>
              )}

              {gras_info?.found !== undefined && (
                <div className="flex items-center justify-between p-4 border border-gray-700 rounded my-3 min-[931px]:hidden">
                  <div>
                    <h6 className="text-sm">{name}</h6>
                    <h3 className="text-lg">
                      {gras_info.found ? "Is on FDAs GRAS list" : "Is not on FDAs GRAS list"}
                    </h3>
                  </div>
                  {gras_info.reference_url && (
                    <a href={gras_info.reference_url} target="_blank" rel="noreferrer">
                      <span className="text-2xl"></span>
                    </a>
                  )}
                </div>
              )}

              {cell_info.length > 0 && cell_info.some(c => c.cellType.trim()) && (
                <div className="p-4 border border-gray-700 rounded my-3 min-[931px]:hidden">
                  <p className="font-semibold">Tested On</p>
                  <h6 className="text-sm text-gray-400">Cell Type - Success Rate</h6>
                  <div className="flex flex-col gap-1 mt-2.5">
                    {cell_info.map((cell, index) => (
                      <p key={index} className="flex justify-between items-center">
                        <span>{cell.cellType}</span>
                        <span className="flex items-center gap-0.5 text-gray-400">
                          {cell.successRate && `(${cell.successRate}%)`}
                          {cell.referenceURL && (
                            <a href={cell.referenceURL} target="_blank" rel="noopener noreferrer"
                               className="hover:underline">
                              <span className="text-sm"></span>
                            </a>
                          )}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: htmlText }} />

              {references.length > 0 && references.some(r => r.reference.trim()) && (
                <div className="my-3">
                  <h3 className="text-xl font-semibold">References</h3>
                  <div className="flex flex-col gap-3 mb-4">
                    {references.filter(r => r.reference.trim()).map((reference, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-400">
                          <a href={reference.url} target="_blank" rel="noopener noreferrer"
                             className="hover:underline">
                            {reference.organisation}
                          </a> - {reference.reference}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="min-[931px]:hidden">
                {structureImage && (
                  <div className="p-4 border border-gray-700 rounded my-3">
                    <img src={structureImage} alt="structural diagram" className="w-full rounded" />
                  </div>
                )}

                {safetyDocumentSheet && (
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded my-3">
                    <div>
                      <h6 className="text-sm">Safety Document Sheet</h6>
                      <h3 className="text-lg">{name} SDS</h3>
                    </div>
                    <a href={safetyDocumentSheet} target="_blank" rel="noopener noreferrer">
                      <span className="text-2xl"></span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-[930px]:hidden">
          <div className="p-4 border border-gray-700 rounded my-3 max-w-[320px]">
            <h4 className="text-lg font-semibold pb-2">Information</h4>
            <h6 className="text-sm">CAS number: {casNumber}</h6>
            <table className="w-full mt-2">
              <tbody>
                {[
                  { label: 'Class', value: chemClass },
                  { label: 'Chemical Formula', value: chemicalFormulaHtml, isHtml: true },
                  { label: 'Molecular Formula', value: molecularFormulaHtml, isHtml: true },
                  { label: 'Molecular Weight', value: molecularWeight },
                  { label: 'Optimal Conc', value: optimalConc },
                ].map(({ label, value, isHtml }) => (
                  <tr key={label}>
                    <td className="text-gray-400 font-semibold py-0.5">{label}</td>
                    <td className="text-right">
                      {isHtml ? <div dangerouslySetInnerHTML={{ __html: value }} /> : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {synonyms.length > 0 && synonyms.some(s => s.trim()) && (
            <div className="p-4 border border-gray-700 rounded my-3 max-w-[320px]">
              <h3 className="text-xl font-semibold">Synonyms</h3>
              <h6 className="text-sm text-gray-400">Also Known As</h6>
              <div className="flex flex-wrap gap-2 mt-2">
                {synonyms.map((synonym, index) => (
                  <p key={index} className="px-2 py-1 border border-gray-700 rounded-2xl">{synonym}</p>
                ))}
              </div>
            </div>
          )}

          {gras_info?.found !== undefined && (
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded my-3 max-w-[320px]">
              <div>
                <h6 className="text-sm">{name}</h6>
                <h3 className="text-lg">
                  {gras_info.found ? "Is on FDAs GRAS list" : "Is not on FDAs GRAS list"}
                </h3>
              </div>
              {gras_info.reference_url && (
                <a href={gras_info.reference_url} target="_blank" rel="noreferrer">
                  <span className="text-2xl"></span>
                </a>
              )}
            </div>
          )}

          {/*{cell_info.length > 0 && cell_info.some(c => c.cellType.trim()) && (
            <div className="p-4 border border-gray-700 rounded my-3 max-w-[320px]">
              <p className="font-semibold">Tested On</p>
              <h6 className="text-sm text-gray-400">Cell Type - Success Rate</h6>
              <div className="flex flex-col gap-1 mt-2.5">
                {cell SverigeInfo.map((cell, index) => (
                  <p key={index} className="flex justify-between items-center">
                    <span>{cell.cellType}</span>
                    <span className="flex items-center gap-0.5 text-gray-400">
                      {cell.successRate && `(${cell.successRate}%)`}
                      {cell.referenceURL && (
                        <a href={cell.referenceURL} target="_blank" rel="noopener noreferrer"
                           className="hover:underline">
                          <span className="text-sm"></span>
                        </a>
                      )}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}*/}

          {structureImage && (
            <div className="p-4 border border-gray-700 rounded my-3 max-w-[320px]">
              <img src={structureImage} alt="structural diagram" className="w-full rounded" />
            </div>
          )}

          {safetyDocumentSheet && (
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded my-3 max-w-[320px]">
              <div>
                <h6 className="text-sm">Safety Document Sheet</h6>
                <h3 className="text-lg">{name} SDS</h3>
              </div>
              <a href={safetyDocumentSheet} target="_blank" rel="noopener noreferrer">
                <span className="text-2xl"></span>
              </a>
            </div>
          )}

          <div className="flex items-center justify-between p-4 border border-gray-700 rounded my-3 max-w-[320px]">
            <div>
              <h5 className="text-base">Powered By</h5>
              <h1 className="text-2xl">CryoDao</h1>
            </div>
            <img 
              src="https://cdn.prod.website-files.com/643d6a447c6e1b4184d3ddfd/643d7ebba7e71c58cdb21f5a_CryoDAO-icon-black.svg" 
              alt="CryoDao Logo" 
              className="w-11 h-11 dark:invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;