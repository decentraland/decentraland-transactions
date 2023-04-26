/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface BidInterface extends utils.Interface {
  functions: {
    "getBidByBidder(address,uint256,address)": FunctionFragment;
    "ERC721Composable_ValidateFingerprint()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "setOwnerCutPerMillion(uint256)": FunctionFragment;
    "bidIdByTokenAndBidder(address,uint256,address)": FunctionFragment;
    "bidCounterByToken(address,uint256)": FunctionFragment;
    "ERC721_Interface()": FunctionFragment;
    "cancelBid(address,uint256)": FunctionFragment;
    "unpause()": FunctionFragment;
    "getBidByToken(address,uint256,uint256)": FunctionFragment;
    "isPauser(address)": FunctionFragment;
    "ERC721_Received()": FunctionFragment;
    "paused()": FunctionFragment;
    "renouncePauser()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "manaToken()": FunctionFragment;
    "placeBid(address,uint256,uint256,uint256)": FunctionFragment;
    "placeBid(address,uint256,uint256,uint256,bytes)": FunctionFragment;
    "addPauser(address)": FunctionFragment;
    "pause()": FunctionFragment;
    "owner()": FunctionFragment;
    "isOwner()": FunctionFragment;
    "ONE_MILLION()": FunctionFragment;
    "ownerCutPerMillion()": FunctionFragment;
    "MAX_BID_DURATION()": FunctionFragment;
    "bidIndexByBidId(bytes32)": FunctionFragment;
    "removeExpiredBids(address[],uint256[],address[])": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "MIN_BID_DURATION()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getBidByBidder"
      | "ERC721Composable_ValidateFingerprint"
      | "onERC721Received"
      | "setOwnerCutPerMillion"
      | "bidIdByTokenAndBidder"
      | "bidCounterByToken"
      | "ERC721_Interface"
      | "cancelBid"
      | "unpause"
      | "getBidByToken"
      | "isPauser"
      | "ERC721_Received"
      | "paused"
      | "renouncePauser"
      | "renounceOwnership"
      | "manaToken"
      | "placeBid(address,uint256,uint256,uint256)"
      | "placeBid(address,uint256,uint256,uint256,bytes)"
      | "addPauser"
      | "pause"
      | "owner"
      | "isOwner"
      | "ONE_MILLION"
      | "ownerCutPerMillion"
      | "MAX_BID_DURATION"
      | "bidIndexByBidId"
      | "removeExpiredBids"
      | "transferOwnership"
      | "MIN_BID_DURATION"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getBidByBidder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ERC721Composable_ValidateFingerprint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setOwnerCutPerMillion",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "bidIdByTokenAndBidder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "bidCounterByToken",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "ERC721_Interface",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelBid",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBidByToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isPauser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "ERC721_Received",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renouncePauser",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "manaToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBid(address,uint256,uint256,uint256)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBid(address,uint256,uint256,uint256,bytes)",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addPauser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ONE_MILLION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ownerCutPerMillion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_BID_DURATION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bidIndexByBidId",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeExpiredBids",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_BID_DURATION",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getBidByBidder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ERC721Composable_ValidateFingerprint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOwnerCutPerMillion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bidIdByTokenAndBidder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bidCounterByToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ERC721_Interface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancelBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBidByToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isPauser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ERC721_Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renouncePauser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "manaToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "placeBid(address,uint256,uint256,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "placeBid(address,uint256,uint256,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addPauser", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ONE_MILLION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerCutPerMillion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_BID_DURATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bidIndexByBidId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeExpiredBids",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_BID_DURATION",
    data: BytesLike
  ): Result;

  events: {
    "BidCreated(bytes32,address,uint256,address,uint256,uint256,bytes)": EventFragment;
    "BidAccepted(bytes32,address,uint256,address,address,uint256,uint256)": EventFragment;
    "BidCancelled(bytes32,address,uint256,address)": EventFragment;
    "ChangedOwnerCutPerMillion(uint256)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
    "PauserAdded(address)": EventFragment;
    "PauserRemoved(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BidCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangedOwnerCutPerMillion"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PauserAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PauserRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface BidCreatedEventObject {
  _id: string;
  _tokenAddress: string;
  _tokenId: BigNumber;
  _bidder: string;
  _price: BigNumber;
  _expiresAt: BigNumber;
  _fingerprint: string;
}
export type BidCreatedEvent = TypedEvent<
  [string, string, BigNumber, string, BigNumber, BigNumber, string],
  BidCreatedEventObject
>;

export type BidCreatedEventFilter = TypedEventFilter<BidCreatedEvent>;

export interface BidAcceptedEventObject {
  _id: string;
  _tokenAddress: string;
  _tokenId: BigNumber;
  _bidder: string;
  _seller: string;
  _price: BigNumber;
  _fee: BigNumber;
}
export type BidAcceptedEvent = TypedEvent<
  [string, string, BigNumber, string, string, BigNumber, BigNumber],
  BidAcceptedEventObject
>;

export type BidAcceptedEventFilter = TypedEventFilter<BidAcceptedEvent>;

export interface BidCancelledEventObject {
  _id: string;
  _tokenAddress: string;
  _tokenId: BigNumber;
  _bidder: string;
}
export type BidCancelledEvent = TypedEvent<
  [string, string, BigNumber, string],
  BidCancelledEventObject
>;

export type BidCancelledEventFilter = TypedEventFilter<BidCancelledEvent>;

export interface ChangedOwnerCutPerMillionEventObject {
  _ownerCutPerMillion: BigNumber;
}
export type ChangedOwnerCutPerMillionEvent = TypedEvent<
  [BigNumber],
  ChangedOwnerCutPerMillionEventObject
>;

export type ChangedOwnerCutPerMillionEventFilter =
  TypedEventFilter<ChangedOwnerCutPerMillionEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface PauserAddedEventObject {
  account: string;
}
export type PauserAddedEvent = TypedEvent<[string], PauserAddedEventObject>;

export type PauserAddedEventFilter = TypedEventFilter<PauserAddedEvent>;

export interface PauserRemovedEventObject {
  account: string;
}
export type PauserRemovedEvent = TypedEvent<[string], PauserRemovedEventObject>;

export type PauserRemovedEventFilter = TypedEventFilter<PauserRemovedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Bid extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BidInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getBidByBidder(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _bidder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber, BigNumber] & {
        bidIndex: BigNumber;
        bidId: string;
        bidder: string;
        price: BigNumber;
        expiresAt: BigNumber;
      }
    >;

    ERC721Composable_ValidateFingerprint(
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC721Received(
      _from: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOwnerCutPerMillion(
      _ownerCutPerMillion: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    bidIdByTokenAndBidder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    bidCounterByToken(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    ERC721_Interface(overrides?: CallOverrides): Promise<[string]>;

    cancelBid(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBidByToken(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, string, BigNumber, BigNumber]>;

    isPauser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    ERC721_Received(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renouncePauser(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    manaToken(overrides?: CallOverrides): Promise<[string]>;

    "placeBid(address,uint256,uint256,uint256)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "placeBid(address,uint256,uint256,uint256,bytes)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _fingerprint: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addPauser(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    isOwner(overrides?: CallOverrides): Promise<[boolean]>;

    ONE_MILLION(overrides?: CallOverrides): Promise<[BigNumber]>;

    ownerCutPerMillion(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_BID_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;

    bidIndexByBidId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    removeExpiredBids(
      _tokenAddresses: PromiseOrValue<string>[],
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _bidders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    MIN_BID_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  getBidByBidder(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _bidder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, BigNumber, BigNumber] & {
      bidIndex: BigNumber;
      bidId: string;
      bidder: string;
      price: BigNumber;
      expiresAt: BigNumber;
    }
  >;

  ERC721Composable_ValidateFingerprint(
    overrides?: CallOverrides
  ): Promise<string>;

  onERC721Received(
    _from: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOwnerCutPerMillion(
    _ownerCutPerMillion: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  bidIdByTokenAndBidder(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  bidCounterByToken(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  ERC721_Interface(overrides?: CallOverrides): Promise<string>;

  cancelBid(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBidByToken(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string, string, BigNumber, BigNumber]>;

  isPauser(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  ERC721_Received(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renouncePauser(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  manaToken(overrides?: CallOverrides): Promise<string>;

  "placeBid(address,uint256,uint256,uint256)"(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "placeBid(address,uint256,uint256,uint256,bytes)"(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _duration: PromiseOrValue<BigNumberish>,
    _fingerprint: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addPauser(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  isOwner(overrides?: CallOverrides): Promise<boolean>;

  ONE_MILLION(overrides?: CallOverrides): Promise<BigNumber>;

  ownerCutPerMillion(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  bidIndexByBidId(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  removeExpiredBids(
    _tokenAddresses: PromiseOrValue<string>[],
    _tokenIds: PromiseOrValue<BigNumberish>[],
    _bidders: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  MIN_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getBidByBidder(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _bidder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber, BigNumber] & {
        bidIndex: BigNumber;
        bidId: string;
        bidder: string;
        price: BigNumber;
        expiresAt: BigNumber;
      }
    >;

    ERC721Composable_ValidateFingerprint(
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      _from: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    setOwnerCutPerMillion(
      _ownerCutPerMillion: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    bidIdByTokenAndBidder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    bidCounterByToken(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ERC721_Interface(overrides?: CallOverrides): Promise<string>;

    cancelBid(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    getBidByToken(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, string, BigNumber, BigNumber]>;

    isPauser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    ERC721_Received(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renouncePauser(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    manaToken(overrides?: CallOverrides): Promise<string>;

    "placeBid(address,uint256,uint256,uint256)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    "placeBid(address,uint256,uint256,uint256,bytes)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _fingerprint: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    addPauser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    pause(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    isOwner(overrides?: CallOverrides): Promise<boolean>;

    ONE_MILLION(overrides?: CallOverrides): Promise<BigNumber>;

    ownerCutPerMillion(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    bidIndexByBidId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeExpiredBids(
      _tokenAddresses: PromiseOrValue<string>[],
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _bidders: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    MIN_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "BidCreated(bytes32,address,uint256,address,uint256,uint256,bytes)"(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: PromiseOrValue<string> | null,
      _price?: null,
      _expiresAt?: null,
      _fingerprint?: null
    ): BidCreatedEventFilter;
    BidCreated(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: PromiseOrValue<string> | null,
      _price?: null,
      _expiresAt?: null,
      _fingerprint?: null
    ): BidCreatedEventFilter;

    "BidAccepted(bytes32,address,uint256,address,address,uint256,uint256)"(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: null,
      _seller?: PromiseOrValue<string> | null,
      _price?: null,
      _fee?: null
    ): BidAcceptedEventFilter;
    BidAccepted(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: null,
      _seller?: PromiseOrValue<string> | null,
      _price?: null,
      _fee?: null
    ): BidAcceptedEventFilter;

    "BidCancelled(bytes32,address,uint256,address)"(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: PromiseOrValue<string> | null
    ): BidCancelledEventFilter;
    BidCancelled(
      _id?: null,
      _tokenAddress?: PromiseOrValue<string> | null,
      _tokenId?: PromiseOrValue<BigNumberish> | null,
      _bidder?: PromiseOrValue<string> | null
    ): BidCancelledEventFilter;

    "ChangedOwnerCutPerMillion(uint256)"(
      _ownerCutPerMillion?: null
    ): ChangedOwnerCutPerMillionEventFilter;
    ChangedOwnerCutPerMillion(
      _ownerCutPerMillion?: null
    ): ChangedOwnerCutPerMillionEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;

    "PauserAdded(address)"(
      account?: PromiseOrValue<string> | null
    ): PauserAddedEventFilter;
    PauserAdded(
      account?: PromiseOrValue<string> | null
    ): PauserAddedEventFilter;

    "PauserRemoved(address)"(
      account?: PromiseOrValue<string> | null
    ): PauserRemovedEventFilter;
    PauserRemoved(
      account?: PromiseOrValue<string> | null
    ): PauserRemovedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    getBidByBidder(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _bidder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ERC721Composable_ValidateFingerprint(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      _from: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOwnerCutPerMillion(
      _ownerCutPerMillion: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    bidIdByTokenAndBidder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bidCounterByToken(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ERC721_Interface(overrides?: CallOverrides): Promise<BigNumber>;

    cancelBid(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBidByToken(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isPauser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ERC721_Received(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renouncePauser(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    manaToken(overrides?: CallOverrides): Promise<BigNumber>;

    "placeBid(address,uint256,uint256,uint256)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "placeBid(address,uint256,uint256,uint256,bytes)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _fingerprint: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addPauser(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    isOwner(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_MILLION(overrides?: CallOverrides): Promise<BigNumber>;

    ownerCutPerMillion(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;

    bidIndexByBidId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeExpiredBids(
      _tokenAddresses: PromiseOrValue<string>[],
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _bidders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    MIN_BID_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getBidByBidder(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _bidder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ERC721Composable_ValidateFingerprint(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      _from: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOwnerCutPerMillion(
      _ownerCutPerMillion: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    bidIdByTokenAndBidder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bidCounterByToken(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ERC721_Interface(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cancelBid(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBidByToken(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPauser(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ERC721_Received(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renouncePauser(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    manaToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "placeBid(address,uint256,uint256,uint256)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "placeBid(address,uint256,uint256,uint256,bytes)"(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _fingerprint: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addPauser(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_MILLION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerCutPerMillion(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MAX_BID_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bidIndexByBidId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeExpiredBids(
      _tokenAddresses: PromiseOrValue<string>[],
      _tokenIds: PromiseOrValue<BigNumberish>[],
      _bidders: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    MIN_BID_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
