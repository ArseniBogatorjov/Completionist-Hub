'use client';

import type { SubmitEvent } from 'react';
import { useState } from 'react';
import { apiClient } from '@/lib/api/apiClient';
import { steamIdSchema } from '@/lib/validations/steam.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { styles } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';

interface Props {
  onSyncSuccess?: () => void;
}

export default function SteamSyncSection({ onSyncSuccess }: Props) {
  const [steamId, setSteamId] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (e: SubmitEvent) => {
    e.preventDefault();
    setValidationError('');
    setApiError('');

    const result = steamIdSchema.safeParse({ steamId });

    if (!result.success) {
      setValidationError(result.error.issues[0]?.message || 'Invalid Steam ID');
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmSync = async () => {
    setIsLoading(true);
    setApiError('');

    try {
      await apiClient('/steam/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steamId }),
      });

      setIsModalOpen(false);
      setSteamId('');
      onSyncSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred during sync.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className={cn('rounded-xl border p-5', styles.GLASS_CARD)}>
        <form
          onSubmit={handleOpenModal}
          className="flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="flex-1 space-y-1">
            <Input
              type="text"
              placeholder="Enter SteamID64 (17 digits)"
              value={steamId}
              onChange={(e) => {
                setSteamId(e.target.value);
                if (validationError) setValidationError('');
              }}
              className={cn(styles.INPUT, 'focus-visible:ring-emerald-500')}
            />
            {validationError && (
              <p className="pl-1 text-xs text-red-400">{validationError}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-500 font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Library
          </Button>
        </form>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Sync Requirements
            </DialogTitle>
            <DialogDescription className="pt-2 text-zinc-400">
              Please verify your Steam account configuration before starting the
              import process.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-3 text-sm text-zinc-300">
            <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-zinc-200">Public Profile</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Set your Steam Privacy Settings for both{' '}
                  <strong className="text-zinc-200">Profile</strong> and{' '}
                  <strong className="text-zinc-200">Game details</strong> to{' '}
                  <strong className="text-zinc-200">Public</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
              <div>
                <p className="font-semibold text-zinc-200">Processing Time</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Large game libraries may take from{' '}
                  <strong className="text-zinc-200">
                    30 seconds up to a few minutes
                  </strong>{' '}
                  to complete initial synchronization.
                </p>
              </div>
            </div>

            {apiError && (
              <p className="rounded-md border border-red-800/50 bg-red-950/40 p-2.5 text-xs text-red-400">
                Sync error: {apiError}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSync}
              disabled={isLoading}
              className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                'Confirm & Sync'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
