"use client";

import SaldoSection from "@/components/common/saldo-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatRupiah } from "@/lib/utils";
import useTransaction from "./useTransaction";

const TransactionPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransaction();

  const formatDate = (isoString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(isoString));
  };

  const allRecords = data?.pages.flatMap((page) => page.records) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-20 items-center w-full">
      <SaldoSection />

      <div className="flex flex-col space-y-4 col-span-5">
        <h3 className="text-xl font-bold text-gray-900">Semua Transaksi</h3>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Spinner className="w-8 h-8 text-red-500" />
          </div>
        )}

        {isError && (
          <p className="text-center py-10 text-red-500 font-medium">
            Gagal memuat riwayat transaksi.
          </p>
        )}

        {!isLoading &&
          !isError &&
          allRecords.map((trx) => {
            const isTopup = trx.transaction_type === "TOPUP";

            return (
              <Card
                key={trx.invoice_number}
                className="rounded-xl border-gray-200 shadow-sm overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3
                        className={`text-2xl font-bold ${isTopup ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {isTopup ? "+" : "-"} Rp{" "}
                        {formatRupiah(trx.total_amount.toString())}
                      </h3>
                      <p className="text-[10px] text-gray-400">
                        {formatDate(trx.created_on)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 text-right max-w-30">
                      {trx.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="ghost"
            className="text-red-500 font-bold hover:bg-transparent mt-4"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center space-x-2">
                <Spinner className="w-4 h-4" /> <span>Memuat...</span>
              </div>
            ) : (
              "Show More"
            )}
          </Button>
        )}

        {!hasNextPage && allRecords.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Semua transaksi telah ditampilkan.
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
