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
        <div className="px-5 py-3 border-b border-[var(--app-card-border)] text-center">
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
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-4 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
          Features
        </h1>
        <p className="text-xl text-[var(--app-foreground-muted)] max-w-2xl mx-auto">
          Discover what makes Superbridge the most advanced cross-chain bridge
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Core Features" className="h-full">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="check" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">Multi-Chain Bridging</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    Bridge assets between Ethereum, Base, Polygon, Arbitrum, and more
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="check" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">Instant Finality</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    Get instant confirmation with our advanced settlement system
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="check" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">Security First</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    Built with enterprise-grade security and audited smart contracts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Advanced Capabilities" className="h-full">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="star" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">Smart Routing</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    AI-powered routing for optimal gas fees and fastest paths
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="star" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">Batch Transactions</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    Bridge multiple assets in a single transaction to save gas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="star" className="text-[var(--app-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--app-foreground)] mb-1">24/7 Support</h4>
                  <p className="text-[var(--app-foreground-muted)] text-sm">
                    Round-the-clock customer support and monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setActiveTab("home")}
          className="px-8 py-3 text-lg hover:bg-[var(--app-accent)] hover:text-[var(--app-background)] transition-all duration-200"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-4 bg-gradient-to-r from-[var(--app-accent)] to-[var(--app-accent-hover)] bg-clip-text text-transparent">
          Superbridge
        </h1>
        <p className="text-xl text-[var(--app-foreground-muted)] max-w-2xl mx-auto">
          Seamlessly bridge your assets across multiple chains with the most advanced cross-chain infrastructure
        </p>
      </div>

      <Card title="Bridge Your Assets" className="max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-center">
            <iframe
              src="https://superbridge.app?widget=true"
              className="w-full max-w-[600px] rounded-[24px] md:rounded-[32px] shadow-2xl h-[700px] border-2 border-[var(--app-card-border)]"
              title="Superbridge Widget"
            />
          </div>
          
          <div className="text-center pt-4">
            <p className="text-[var(--app-foreground-muted)] text-sm">
              Powered by Superbridge - The most advanced cross-chain bridge infrastructure
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="text-center hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="w-16 h-16 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="star" size="lg" className="text-[var(--app-accent)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">Multi-Chain Support</h3>
            <p className="text-[var(--app-foreground-muted)] text-sm">
              Bridge between Ethereum, Base, Polygon, and many more chains
            </p>
          </div>
        </Card>

        <Card className="text-center hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="w-16 h-16 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size="lg" className="text-[var(--app-accent)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">Secure & Fast</h3>
            <p className="text-[var(--app-foreground-muted)] text-sm">
              Industry-leading security with lightning-fast transaction speeds
            </p>
          </div>
        </Card>

        <Card className="text-center hover:scale-105 transition-transform duration-200">
          <div className="p-6">
            <div className="w-16 h-16 bg-[var(--app-accent-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heart" size="lg" className="text-[var(--app-accent)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">User Friendly</h3>
            <p className="text-[var(--app-foreground-muted)] text-sm">
              Simple interface designed for both beginners and experts
            </p>
          </div>
        </Card>
      </div>
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
