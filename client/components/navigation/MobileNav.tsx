'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Gamepad2,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-300 hover:text-teal-400 md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-70 border-white/10 bg-zinc-950/95 p-6 text-zinc-100 backdrop-blur-xl"
      >
        <SheetHeader className="border-b border-white/10 pb-4 text-left">
          <SheetTitle className="flex items-center gap-2 text-zinc-100">
            <Gamepad2 className="h-5 w-5 text-teal-400" />
            <span>Completionist Hub</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 py-2 text-base text-zinc-400 transition-colors hover:text-teal-400"
          >
            Main
          </Link>

          {!isLoading && user && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 text-base text-zinc-400 transition-colors hover:text-teal-400"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
          )}

          {!isLoading && !user && (
            <div className="my-2 flex flex-col gap-3 border-t border-white/10 pt-4">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-teal-400"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>

              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full justify-start border border-teal-400/50 bg-teal-400/10 text-teal-400 transition-all hover:bg-teal-400 hover:text-black">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
          )}

          {!isLoading && user && (
            <div className="mt-2 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center gap-3 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/10">
                  <User className="h-5 w-5 text-teal-400" />
                </div>

                <span className="text-sm font-medium text-zinc-200">
                  {user.username}
                </span>
              </div>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-rose-400 hover:bg-rose-500/10 hover:text-rose-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
