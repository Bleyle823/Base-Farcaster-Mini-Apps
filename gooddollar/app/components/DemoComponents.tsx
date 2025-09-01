"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
        <div className="space-y-3">
          <Button variant="outline" onClick={() => setActiveTab("home")}>
            Back to Home
          </Button>
          <Button
            onClick={() => setActiveTab("savings")}
            icon={<Icon name="star" size="sm" />}
          >
            GoodDollar Savings
          </Button>
        </div>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="My First Mini App">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          This is a minimalistic Mini App built with OnchainKit components.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => setActiveTab("features")}
            icon={<Icon name="arrow-right" size="sm" />}
          >
            Explore Features
          </Button>
          <Button
            onClick={() => setActiveTab("savings")}
            variant="outline"
            icon={<Icon name="star" size="sm" />}
          >
            GoodDollar Savings
          </Button>
        </div>
      </Card>

      <TodoList />

      <TransactionCard />
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn about MiniKit", completed: false },
    { id: 2, text: "Build a Mini App", completed: true },
    { id: 3, text: "Deploy to Base and go viral", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Card title="Get started">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
          />
          <Button
            variant="primary"
            size="md"
            onClick={addTodo}
            icon={<Icon name="plus" size="sm" />}
          >
            Add
          </Button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id={`todo-${todo.id}`}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    todo.completed
                      ? "bg-[var(--app-accent)] border-[var(--app-accent)]"
                      : "border-[var(--app-foreground-muted)] bg-transparent"
                  }`}
                >
                  {todo.completed && (
                    <Icon
                      name="check"
                      size="sm"
                      className="text-[var(--app-background)]"
                    />
                  )}
                </button>
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-[var(--app-foreground-muted)] cursor-pointer ${todo.completed ? "line-through opacity-70" : ""}`}
                >
                  {todo.text}
                </label>
              </div>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}


function TransactionCard() {
  const { address } = useAccount();

  // Example transaction call - sending 0 ETH to self
  const calls = useMemo(() => address
    ? [
        {
          to: address,
          data: "0x" as `0x${string}`,
          value: BigInt(0),
        },
      ]
    : [], [address]);

  const sendNotification = useNotification();

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Transaction successful: ${transactionHash}`);

    await sendNotification({
      title: "Congratulations!",
      body: `You sent your a transaction, ${transactionHash}!`,
    });
  }, [sendNotification]);

  return (
    <Card title="Make Your First Transaction">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Experience the power of seamless sponsored transactions with{" "}
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052FF] hover:underline"
          >
            OnchainKit
          </a>
          .
        </p>

        <div className="flex flex-col items-center">
          {address ? (
            <Transaction
              calls={calls}
              onSuccess={handleSuccess}
              onError={(error: TransactionError) =>
                console.error("Transaction failed:", error)
              }
            >
              <TransactionButton className="text-white text-md" />
              <TransactionStatus>
                <TransactionStatusAction />
                <TransactionStatusLabel />
              </TransactionStatus>
              <TransactionToast className="mb-4">
                <TransactionToastIcon />
                <TransactionToastLabel />
                <TransactionToastAction />
              </TransactionToast>
            </Transaction>
          ) : (
            <p className="text-yellow-400 text-sm text-center mt-2">
              Connect your wallet to send a transaction
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

// GoodDollar Savings Widget Component
export function GoodDollarSavingsWidget() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [inputAmount, setInputAmount] = useState('0.0');
  const [walletBalance, setWalletBalance] = useState<bigint>(BigInt(0));
  const [currentStake, setCurrentStake] = useState<bigint>(BigInt(0));
  const [unclaimedRewards, setUnclaimedRewards] = useState<bigint>(BigInt(0));
  const [totalStaked, setTotalStaked] = useState<bigint>(BigInt(0));
  const [userWeeklyRewards, setUserWeeklyRewards] = useState<bigint>(BigInt(0));
  const [rewardRate, setRewardRate] = useState<bigint>(BigInt(0));
  const [annualAPR, setAnnualAPR] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [inputError, setInputError] = useState('');

  // Contract addresses and ABI
  const STAKING_CONTRACT_ADDRESS = '0x799a23dA264A157Db6F9c02BE62F82CE8d602A45' as const;
  const GDOLLAR_CONTRACT_ADDRESS = '0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A' as const;
  
  const STAKING_CONTRACT_ABI = [
    'function balanceOf(address account) view returns (uint256)',
    'function earned(address account) view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function periodFinish() view returns (uint256)',
    'function getEffectiveRewardRate() view returns (uint256)',
    'function stake(uint256 amount)',
    'function withdraw(uint256 amount)',
    'function getReward()'
  ] as const;

  const formatBigInt = (num: bigint) => {
    return Intl.NumberFormat().format(Number(num) / 1e18);
  };

  const toEtherNumber = (num: bigint) => {
    return Number(num) / 1e18;
  };

  const formatPercent = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const validateInput = (force: boolean = false) => {
    setInputError('');
    if (!inputAmount || inputAmount.trim() === '') {
      return;
    }

    // Check for invalid characters (only numbers and decimal point allowed)
    const validInputRegex = /^[0-9]*\.?[0-9]*$/;
    if (!validInputRegex.test(inputAmount)) {
      setInputError('Invalid value');
      return;
    }

    const numValue = parseFloat(inputAmount);
    if (isNaN(numValue) || numValue < 0) {
      setInputError('Invalid value');
      return;
    }
    if (numValue === 0 && force) {
      setInputError('Please enter a valid amount');
      return;
    }

    if (activeTab === 'stake') {
      const inputAmountWei = BigInt(Math.floor(parseFloat(inputAmount) * 1e18));
      if (inputAmountWei > walletBalance) {
        setInputError('Insufficient balance');
        return;
      }
    }

    if (activeTab === 'unstake') {
      const inputAmountWei = BigInt(Math.floor(parseFloat(inputAmount) * 1e18));
      if (inputAmountWei > currentStake) {
        setInputError('Max amount exceeded');
        return;
      }
    }
  };

  const handleMaxClick = () => {
    if (activeTab === "stake") {
      setInputAmount(toEtherNumber(walletBalance).toString());
    } else {
      setInputAmount(toEtherNumber(currentStake).toString());
    }
    setInputError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
    validateInput();
  };

  const handleTabClick = (tab: 'stake' | 'unstake') => {
    setActiveTab(tab);
    setInputError('');
  };

  const handleConnectWallet = () => {
    // This will be handled by the wallet connection in the parent component
    console.log('Connect wallet clicked');
  };

  const handleStake = async () => {
    if (!address) return;
    validateInput(true);
    if (inputError) {
      return;
    }

    try {
      setTxLoading(true);
      // Here you would implement the actual staking logic using viem/wagmi
      // For now, we'll just simulate the transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInputAmount('0.0');
      setInputError('');
    } catch (error) {
      console.error('Staking error:', error);
    } finally {
      setTxLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!address) return;
    validateInput(true);
    if (inputError) {
      return;
    }

    try {
      setTxLoading(true);
      // Here you would implement the actual unstaking logic using viem/wagmi
      // For now, we'll just simulate the transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInputAmount('0.0');
      setInputError('');
    } catch (error) {
      console.error('Unstaking error:', error);
    } finally {
      setTxLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!address) return;

    try {
      setIsClaiming(true);
      // Here you would implement the actual claiming logic using viem/wagmi
      // For now, we'll just simulate the transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Claim error:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  const isConnected = !!address;

  return (
    <Card title="GoodDollar Savings" className="max-w-md mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img 
              alt="G$ logo" 
              src="https://raw.githubusercontent.com/GoodDollar/GoodDAPP/master/src/assets/Splash/logo.svg"
              className="w-11 h-11"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--app-foreground)]">GoodDollar Savings</h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-[var(--app-gray)] rounded-xl p-1 border border-[var(--app-card-border)]">
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
              activeTab === "stake" 
                ? "bg-[#00b0ff] text-white shadow-md" 
                : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
            }`}
            onClick={() => handleTabClick("stake")}
          >
            Stake
          </button>
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
              activeTab === "unstake" 
                ? "bg-[#00b0ff] text-white shadow-md" 
                : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
            }`}
            onClick={() => handleTabClick("unstake")}
          >
            Unstake
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-[var(--app-gray)] rounded-xl p-4 border border-[var(--app-card-border)]">
          {isConnected && (
            <div className="flex justify-end items-center mb-3 text-sm text-[var(--app-foreground-muted)]">
              <span>
                {activeTab === "stake"
                  ? `Wallet Balance: ${isLoading ? 'Loading...' : formatBigInt(walletBalance)}`
                  : `Current Stake: ${isLoading ? 'Loading...' : formatBigInt(currentStake)}`
                }
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputAmount}
              onChange={handleInputChange}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-semibold text-[var(--app-foreground)] outline-none"
            />
            <button 
              className="bg-white rounded-lg px-3 py-1.5 text-xs font-normal text-gray-700 border border-gray-700 hover:border-[#00b0ff] hover:text-[#00b0ff] transition-colors"
              onClick={handleMaxClick}
            >
              Max
            </button>
          </div>
          {inputError && (
            <div className="text-red-600 text-xs mt-1 pl-1">{inputError}</div>
          )}
        </div>

        {/* Rewards Section */}
        {isConnected && (
          <div className="flex justify-between items-center">
            <span className="text-base text-[var(--app-foreground)]">Unclaimed Rewards</span>
            <div className="flex items-center gap-2">
              <button 
                className="text-[#0387c3] text-base font-semibold underline cursor-pointer disabled:opacity-50"
                onClick={handleClaim}
                disabled={isClaiming}
              >
                {isClaiming ? 'Claiming...' : 'Claim'}
              </button>
              <span>{isLoading ? 'Loading...' : formatBigInt(unclaimedRewards)}</span>
            </div>
          </div>
        )}

        {/* Main Action Button */}
        {!isConnected ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleConnectWallet}
            className="w-full"
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={activeTab === "stake" ? handleStake : handleUnstake}
            disabled={txLoading}
            className="w-full"
          >
            {txLoading ? 'Processing...' : (activeTab === "stake" ? "Stake" : "Unstake")}
          </Button>
        )}

        {/* Stats Section */}
        <div className="bg-[var(--app-gray)] rounded-xl p-5 border border-[var(--app-card-border)]">
          <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-4">Staking Statistics</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-[var(--app-card-border)]">
              <span className="text-sm text-[var(--app-foreground-muted)]">Total G$ Staked</span>
              <span className="text-sm font-semibold text-[var(--app-foreground)]">
                {isLoading ? 'Loading...' : formatBigInt(totalStaked)}
              </span>
            </div>

            {isConnected && (
              <>
                <div className="flex justify-between items-center py-2 border-b border-[var(--app-card-border)]">
                  <span className="text-sm text-[var(--app-foreground-muted)]">Your G$ Stake Pool Share</span>
                  <span className="text-sm font-semibold text-[var(--app-foreground)]">
                    {isLoading ? 'Loading...' : formatBigInt(currentStake)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-[var(--app-card-border)]">
                  <span className="text-sm text-[var(--app-foreground-muted)]">Your Weekly Rewards</span>
                  <span className="text-sm font-semibold text-[var(--app-foreground)]">
                    {isLoading ? 'Loading...' : formatBigInt(userWeeklyRewards)}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-[var(--app-foreground-muted)]">Annual Stake APR</span>
              <span className="text-sm font-semibold text-[var(--app-foreground)]">
                {isLoading ? 'Loading...' : formatPercent(annualAPR)}
              </span>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {(txLoading || isClaiming) && (
          <div className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center pointer-events-none">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b0ff]"></div>
          </div>
        )}
      </div>
    </Card>
  );
}
