import { CosmosSdkHost } from "../../common/cosmos-sdk-host";
import { ValidatorDistInfo } from "./types/validator-dist-info";
import { AccAddress } from "../../types/cosmos-sdk/address/acc-address";
import { ValAddress } from "../../types/cosmos-sdk/address/val-address";
import { BaseReq } from "../../types/cosmos-sdk/rest";
import { Coin } from "../../types/cosmos-sdk/coin";
import { Address } from "../../types/cosmos-sdk/address/address";
import { DistributionParameter } from "./types/distribution-parameter";
import { StdTx } from "../auth/types/stdtx";
import { MsgWithdrawDelegationReward } from "./types/msg-withdraw-delegation-reward";
import { MsgWithdrawDelegatorReward } from "./types/msg-withdraw-delegator-reward";
import { MsgSetWithdrawAddress } from "./types/msg-set-withdraw-address";
import { MsgWithdrawValidatorCommission } from "./types/msg-withdraw-validator-commision";

export module Distribution {

    /**
     * @param host /slashing/validators/{validatorPubKey}/signing_info
     * @param delegatorAddr
     * @param validatorAddr
     */

    export function postWithdrawDelegatorRewards(host: CosmosSdkHost, delegatorAddr: AccAddress, baseReq: BaseReq) {
        return host.post<StdTx<MsgWithdrawDelegatorReward>>(`/distribution/delegators/${delegatorAddr}/rewards`, baseReq)
    }

    export function postWithdrawDelegationRewards(host: CosmosSdkHost, delegatorAddr: AccAddress, validatorAddr: ValAddress, baseReq: BaseReq) {
        return host.post<StdTx<MsgWithdrawDelegationReward>>(`/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`, baseReq)
    }

    export function postSetDelegatorWithdrawalAddr(host: CosmosSdkHost, delegatorAddr: AccAddress, baseReq: BaseReq) {
        return host.post<StdTx<MsgSetWithdrawAddress>>(`/distribution/delegators/${delegatorAddr}/withdraw_address`, baseReq)
    }

    export function postWithdrawValidatorRewards(host: CosmosSdkHost, validatorAddr: ValAddress, baseReq: BaseReq) {
        return host.post<StdTx<MsgWithdrawValidatorCommission>>(`/distribution/validators/${validatorAddr}/rewards`, baseReq)
    }

    export function getDelegatorRewards(host: CosmosSdkHost, delegatorAddr: AccAddress) {
        return host.get<Coin>(`/distribution/delegators/${delegatorAddr}/rewards`)
    }

    export function getDelegationRewards(host: CosmosSdkHost, delegatorAddr: AccAddress, validatorAddr: ValAddress) {
        return host.get<Coin>(`/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`)
    }

    export function getDelegatorWithdrawalAddr(host: CosmosSdkHost, delegatorAddr: AccAddress) {
        return host.get<Address>(`/distribution/delegators/${delegatorAddr}/withdraw_address`)
    }

    export function getValidatorInfo(host: CosmosSdkHost, validatorAddr: ValAddress) {
        return host.get<ValidatorDistInfo>(`/distribution/validators/${validatorAddr}`)
    }

    export function getValidatorRewards(host: CosmosSdkHost, validatorAddr: ValAddress) {
        return host.get<Coin>(`/distribution/validators/${validatorAddr}/rewards`)
    }

    export function getCommunityPool(host: CosmosSdkHost) {
        return host.get<Coin>('/distribution/community_pool')
    }

    export function getOutstandingRewards(host: CosmosSdkHost, validatorAddr: ValAddress) {
        return host.get<Coin>(`/distribution/validators/${validatorAddr}/outstanding_rewards`)
    }

    export function getParams(host: CosmosSdkHost) {
        return host.get<DistributionParameter>('/distribution/parameters')
    }
}
