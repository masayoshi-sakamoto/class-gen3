import { <%= appName %>GatewayBase } from './base'
import { to<%= className %>Props, to<%= className %>Seed } from './translator/<%= className.toLowerCase() %>'
import { optionsToQuery, toQueryProps } from './translator/query'
import { toOptionsProps } from './translator/options'
import { Get<%= className %>, Fetch<%= classNames %>, Post<%= className %>, Put<%= className %>, Delete<%= className %> } from '@/infrastructure/network/<%= appName %>/requests/<%= className.toLowerCase() %>'
import <%= className %>Entity, { I<%= className %>Props, Empty<%= className %>PropsFactory } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'

export default class <%= className %> extends <%= appName %>GatewayBase {
  async Get<%= className %>(id: string): Promise<I<%= className %>Props> {
    const { <%= className.toLowerCase() %> } = await this.apiClient.request(new Get<%= className %>(id))
    return <%= className.toLowerCase() %> ? to<%= className %>Props(<%= className.toLowerCase() %>) : Empty<%= className %>PropsFactory()
  }

  async Fetch<%= classNames %>(options?: IOptionsProps) {
    const response = await this.apiClient.request(new Fetch<%= classNames %>(optionsToQuery(options)))
    return {
      items: response.<%= classNames.toLowerCase() %>.map((prop) => to<%= className %>Props(prop)),
      query: toQueryProps(response.query),
      options: toOptionsProps(response.query)
    }
  }

  async Save<%= className %>(entity: <%= className %>Entity) {
    const data = entity.id ? new Put<%= className %>(to<%= className %>Seed(entity.props)) : new Post<%= className %>(to<%= className %>Seed(entity.props))
    await this.apiClient.request(data)
  }

  async Delete<%= className %>(entity: <%= className %>Entity) {
    if (entity.id) {
      await this.apiClient.request(new Delete<%= className %>(entity.id))
    }
  }
}
